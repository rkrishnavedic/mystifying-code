import './App.css';
import { useState } from 'react';
import { Dropdown, PrimaryButton, Spinner, SpinnerSize, TextField } from '@fluentui/react';
import { defaultCode } from './defaultCodes';
import Editor from '@monaco-editor/react';
import { createSubmission, getSubmission } from './api';
import { Base64 } from 'js-base64';


const languageList = [
  {key:'cpp', text:'C++'},
  {key: 'c', text:'C'},
  {key: 'python', text: 'python'}
];


function App() {
  const [language, setLanguage] = useState(languageList[0]);
  const [code, setCode] = useState('');
  const [inputText, setInputText] = useState(null);
  const [result, setResult] = useState(null);
  const [execute, setExecute] = useState(false);

  const changeLanguage = async (option)=>{
    await setLanguage(option);
    await setCode(defaultCode(option.key));
    // console.log(option)
  }

  const onSubmission = async ()=>{
    // console.log(process.env);
    await setExecute(true);
    const token =  await createSubmission(language.key, Base64.encode(code), Base64.encode(inputText));
    // console.log(token)
    const res = await getSubmission(token?.token);
    await setResult(res)
    // console.log(res)
    setExecute(false);
  }
  
  return (
    <div className="App">
      <div className="sidebar-container">
      <div className="header-title">
           {"<"} code "editor" {"/>"}
      </div>
        <div className="sidebar-dark">

          <div style={{display:'flex', justifyContent:'space-between' ,alignItems:'center'}}>
            <p>Select language:</p>
            
            <Dropdown
            
            placeholder="Select an option"
            options={languageList}
            selectedKey = {language?.key}
            onChange={(val, option)=>{changeLanguage(option)}}
            
            />
          </div>

          <div style={{height:'10px'}}/>

          <div>
            <p>Input:</p>
            <TextField value={inputText} onChange={(_, val)=>{setInputText(val);}} multiline resizable={false}/>
          </div>

          <div style={{height:'10px'}}/>

          <div style={{display:'flex', justifyContent:'space-between'}}>
            <PrimaryButton disabled={execute} onClick={onSubmission} text="Compile & Run"/>
            {execute? <Spinner size={SpinnerSize.large}/>
            :
            <p style={{fontSize:'10px'}}>{result?.status?.description}</p>
            }
          </div>

          <div style={{height:'20px'}}/>

          <div>
            <p>Output:</p>
            <TextField value={Base64.decode(result?.stdout? result.stdout:"")} multiline resizable={false}/>
          </div>
          
        </div>
      </div>
      
      <div>
        <Editor
            language={language.key}
            value={code}
            theme="vs-dark"
            onChange={(newValue)=> setCode(newValue)}
            defaultValue={defaultCode(language.key)}
            width="70vw"
            height="100%"
          />
      </div>
    </div>
  );
}

export default App;
