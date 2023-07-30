// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;
use techno_bike::{self, bike::Bike};
use evmap::{ReadHandle, WriteHandle};
use std::{thread, sync::MutexGuard};
use tauri::State;
use std::sync::Mutex;

//Reader struct
struct Reader(Mutex<ReadHandle<String, Bike>>);

//Writer struct
struct Writer(Mutex<WriteHandle<String, Bike>>);

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_num_bikes(reader: State<Reader>) -> String {
    let state_guard = reader.0.lock().unwrap();

    let bikes = state_guard.len();

    bikes.to_string()
}

#[derive(Serialize)]
struct BikeData {
    name: String,
    watt: String,
    weight: String
}

#[tauri::command]
fn get_bikes(reader: State<Reader>) -> String {
    let state_guard: MutexGuard<ReadHandle<String, Bike>> = reader.0.lock().unwrap();

    let mut bikes: Vec<String> = vec![];
    if state_guard.len() == 0 {
        return String::from("");
    }
    let mut dataBikes: Vec<BikeData> = vec![];

    for (name, bikes_read) in &state_guard.read().unwrap() {
        for cbike in bikes_read{
            dataBikes.push(
                BikeData{
                    name:name.clone(),
                    watt:cbike.watt.to_string(),
                    weight:cbike.weight.to_string()
                }
            )
        }
    }

    let ret = serde_json::to_string(&dataBikes).unwrap();
    ret
}

/*#[tauri::command]
fn set_bike_rider(reader: State<Reader>, id: &str, name: &str, age: u8, weight: u16) -> bool {
    let state_guard: MutexGuard<ReadHandle<String, Bike>> = reader.0.lock().unwrap();
    if state_guard.len() == 0 {
        return false
    }
    if let bikes = &state_guard.get(&String::from(id)).unwrap() {
        for bike in bikes {
            //bike.set_rider(String::from(name), age, weight);
            return true
        }
    }
    return false
    
}
*/
fn main() {
    let mut reciever = techno_bike::start_listener();
    let reader = reciever.reader.clone();
    //let writer = reciever.writer.copy(); //This cannot be done without a Mutex

    //Writer(writer);

    println!("Message from Rust: {}", "TEST");
    thread::spawn(move || {reciever.receiver_loop()});

    //start http server
    thread::spawn(move || {techno_bike::http()});


    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_num_bikes, get_bikes])
        .manage(Reader(Mutex::new(reader)))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
