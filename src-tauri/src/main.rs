#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

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

#[tauri::command]
fn get_bikes(reader: State<Reader>) -> String {
    let state_guard: MutexGuard<ReadHandle<String, Bike>> = reader.0.lock().unwrap();

    let mut bikes: Vec<String> = vec![];
    if state_guard.len() == 0 {
        return String::from("");
    }
    for (name, bikes_read) in &state_guard.read().unwrap() {
        let mut json = String::from("{ \"name\": \"");
        json.push_str(name);
        json.push_str("\",\n \"watt\": \"");
        for bike in bikes_read{
            //This is gross, preparing for serde
            json.push_str(bike.watt.to_string().as_str());
        }
        json.push_str("\", \n \"weight:\"");
        for bike in bikes_read{
            //This is gross, preparing for serde
            json.push_str(bike.weight.to_string().as_str());
        }


        json.push_str("\" }");
        bikes.push(json);
    }   
    let mut ret = String::from("[");
    for bike in bikes {
        ret.push_str(&bike);
        ret.push_str(",\n");
        
    }

    ret.push_str("]");
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