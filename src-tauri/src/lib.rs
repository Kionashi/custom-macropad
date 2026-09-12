use enigo::{Direction, Enigo, Key, Keyboard, Settings};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![press_key, launch_app])
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
fn press_key(keys: Vec<String>) -> Result<(), String> {
    std::process::Command::new("notepad.exe")
        .spawn()
        .map_err(|error| error.to_string())?;

    std::thread::sleep(std::time::Duration::from_millis(500));

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
    let parsed_keys: Result<Vec<Key>, String> = keys.iter().map(|key| parse_key(key.as_str())).collect();
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
    match key.to_lowercase().as_str() {
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
            if key.chars().count() == 1 {
                let character = key
                    .chars()
                    .next()
                    .ok_or("Key cannot be empty".to_string())?;
                return Ok(Key::Unicode(character));
            }

            Err(format!("Unsupported key: {}", key))
        }
    }
}
