const initialCpp = 
`#include <iostream>
using namespace std;

int main(){

  //lets code it out!

  return 0;
}
`;


const initialC = 
`#include <stdio.h>

int main(){

  //lets code it out!

  return 0;
}
`;




const initialPython = 
`def main():
    # lets code it out!
    
if __name__ == "__main__":
    main()

`


export const defaultCode = (lang)=>{
    switch(lang){
        case 'python':
            return initialPython;
        case 'c':
            return initialC;
        case 'cpp':
            return initialCpp;


        default:
            return initialCpp;
    }
}