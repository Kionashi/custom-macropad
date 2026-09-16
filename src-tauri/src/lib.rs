use enigo::{Direction, Enigo, Key, Keyboard, Settings};
use std::sync::{Arc, Mutex};
use windows::Win32::UI::WindowsAndMessaging::{GetForegroundWindow, SetForegroundWindow};
use tauri::Manager;

struct TrackerState {
    last_foreground: Arc<Mutex<Option<usize>>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let tracker_state = TrackerState {
        last_foreground: Arc::new(Mutex::new(None)),
    };
    tauri::Builder::default()
        .manage(tracker_state)
        .setup(|app: &mut tauri::App| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            let macro_window = get_macro_window(app)?.0 as usize;
            let tracker_state = Arc::clone(
                &app.state::<TrackerState>().last_foreground
            );

            start_tracker(macro_window, tracker_state)?;
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            press_key,
            launch_app,
            get_last_foreground,
            restore_foreground_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn launch_app(path: String) -> Result<(), String> {
    std::process::Command::new(path)
        .spawn()
        .map_err(|error| error.to_string())?;

    Ok(())
}

#[tauri::command]
fn press_key(keys: Vec<String>, state: tauri::State<'_, TrackerState>) -> Result<(), String> {
    
    restore_window(&state)?;

    let mut enigo = Enigo::new(&Settings::default()).map_err(|error| error.to_string())?;

    let is_key_combination = keys.len() > 1;
    if is_key_combination {
        press_key_combination(&mut enigo, &keys)?;

        return Ok(());
    }

    let first = keys.first().ok_or("No keys provided".to_string())?;
    let key = parse_key(first)?;

    press_single_key(&mut enigo, key)?;

    Ok(())
}

fn press_single_key(enigo: &mut Enigo, key: Key) -> Result<(), String> {
    enigo
        .key(key, Direction::Click)
        .map_err(|error| error.to_string())?;

    Ok(())
}

fn press_key_combination(enigo: &mut Enigo, keys: &[String]) -> Result<(), String> {
    let parsed_keys: Result<Vec<Key>, String> =
        keys.iter().map(|key| parse_key(key.as_str())).collect();
    let parsed_keys = parsed_keys?;

    for key in &parsed_keys {
        enigo
            .key(*key, Direction::Press)
            .map_err(|error| error.to_string())?;
    }

    for key in parsed_keys.iter().rev() {
        enigo
            .key(*key, Direction::Release)
            .map_err(|error| error.to_string())?;
    }

    Ok(())
}

fn parse_key(key: &str) -> Result<Key, String> {
    let normalized = key.to_lowercase();
    match normalized.as_str() {
        "ctrl" => Ok(Key::Control),
        "shift" => Ok(Key::Shift),
        "alt" => Ok(Key::Alt),
        "enter" => Ok(Key::Return),
        "tab" => Ok(Key::Tab),
        "backspace" => Ok(Key::Backspace),
        "esc" | "escape" => Ok(Key::Escape),
        "space" => Ok(Key::Space),
        "supr" | "del" | "delete" => Ok(Key::Delete),
        "left" => Ok(Key::LeftArrow),
        "right" => Ok(Key::RightArrow),
        "up" => Ok(Key::UpArrow),
        "down" => Ok(Key::DownArrow),
        "home" => Ok(Key::Home),
        "end" => Ok(Key::End),
        "pageup" | "page_up" => Ok(Key::PageUp),
        "pagedown" | "page_down" => Ok(Key::PageDown),
        "f1" => Ok(Key::F1),
        "f2" => Ok(Key::F2),
        "f3" => Ok(Key::F3),
        "f4" => Ok(Key::F4),
        "f5" => Ok(Key::F5),
        "f6" => Ok(Key::F6),
        "f7" => Ok(Key::F7),
        "f8" => Ok(Key::F8),
        "f9" => Ok(Key::F9),
        "f10" => Ok(Key::F10),
        "f11" => Ok(Key::F11),
        "f12" => Ok(Key::F12),
        "win" | "super" | "command" => Ok(Key::Meta),
        _ => {
            if normalized.chars().count() == 1 {
                let character = normalized
                    .chars()
                    .next()
                    .ok_or("Key cannot be empty".to_string())?;
                return Ok(Key::Unicode(character));
            }

            Err(format!("Unsupported key: {}", key))
        }
    }
}

fn get_macro_window(app: &mut tauri::App) -> Result<windows::Win32::Foundation::HWND, String> {
    let window = app.get_webview_window("main")
        .ok_or("Could not find main window".to_string())?;
    let hwnd = window.hwnd().map_err(|error| error.to_string())?;

    Ok(hwnd)
}

fn start_tracker(
    macro_window: usize,
    tracker_state: Arc<Mutex<Option<usize>>>,
) -> Result<(), String> {

    std::thread::spawn(move || loop {
        let foreground = unsafe { GetForegroundWindow() };

        if foreground.0 as usize != macro_window {
            let mut last_foreground = tracker_state.lock().unwrap();

            *last_foreground = Some(foreground.0 as usize);
        }

        println!("Foreground: {:?}", foreground);
        println!("MacroPad:   {:?}", macro_window);
        println!("Last Foreground: {:?}", *tracker_state.lock().unwrap());

        std::thread::sleep(std::time::Duration::from_secs(1));
    });

    Ok(())
}

#[tauri::command]
fn get_last_foreground(state: tauri::State<'_, TrackerState>) -> Result<Option<usize>, String> {
    let last_foreground = state
        .last_foreground
        .lock()
        .map_err(|error| error.to_string())
        .map(|last_foreground| *last_foreground);

    print!("Last Foreground: {:?}", last_foreground);

    last_foreground
}

#[tauri::command]
fn restore_foreground_window(state: tauri::State<'_, TrackerState>) -> Result<(), String> {
    restore_window(&state)
}

fn restore_window(state: &TrackerState) -> Result<(), String> {
    // read state.last_foreground
    let last_foreground = state.last_foreground.lock().map_err(|error| error.to_string())?.ok_or("No last foreground window found".to_string())?;
        
    // convert usize -> HWND
    let hwnd = windows::Win32::Foundation::HWND(last_foreground as *mut std::ffi::c_void);

    unsafe {
        SetForegroundWindow(hwnd)
            .ok()
            .map_err(|error| error.to_string())?;
    }
    Ok(())
}
