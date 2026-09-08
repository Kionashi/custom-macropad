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
        .invoke_handler(tauri::generate_handler![get_greeting, launch_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_greeting(name: String) -> String {
    format!("Hello, {} from Rust!", name)
}

#[tauri::command]
fn launch_app(path: String) -> Result<(), String> {
    std::process::Command::new(path)
        .spawn()
        .map_err(|error| error.to_string())?;

    Ok(())
}
