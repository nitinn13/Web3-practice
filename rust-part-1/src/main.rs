// fn main() {
//     let ans = is_even(20);
//     println!("{}", ans );
// }
// fn is_even(num : i32) -> bool{
//     if num % 2 == 0{
//         return true;
//     }
//     return false;
// }

// fn fib(num : i32) -> i32 {
//     let mut first = 0;
//     let mut second = 1;
//     if num ==0 {
//         return first;
//     }
//     if num ==1 {
//         return second;
//     }
//     for i in 1..num - 2 {
//         let temp = second;
//         second = second + first;
//         first = temp;
//     }
//     return second;


// }


fn get_length(s : &str) -> usize {
    s.chars().count();
}
fn main(){
    let my_string = String::from("gMPC Arcium");
    let length = get_length(&my_string);
    println!("{}", length);
}