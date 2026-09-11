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
    let character = first.chars().next().ok_or("Key cannot be empty".to_string())?;

    press_single_key(&mut enigo, character)?;

    Ok(())
}

fn press_single_key(enigo: &mut Enigo, character: char) -> Result<(), String> {
    enigo
        .key(Key::Unicode(character), Direction::Click)
        .map_err(|error| error.to_string())?;

    Ok(())
}

fn press_key_combination(enigo: &mut Enigo, keys: &[String]) -> Result<(), String> {
    for key in keys {
        let character = key.chars().next().ok_or("Key cannot be empty".to_string())?;

        enigo
            .key(Key::Unicode(character), Direction::Press)
            .map_err(|error| error.to_string())?;
    }

    for key in keys.iter().rev() {
        let character = key.chars().next().ok_or("Key cannot be empty".to_string())?;

        enigo
            .key(Key::Unicode(character), Direction::Release)
            .map_err(|error| error.to_string())?;
    }

    Ok(())
}
