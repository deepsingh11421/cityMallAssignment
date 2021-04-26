import React,{useState} from 'react';
import { Button,DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './App.css';
import {AgGridReact,AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import countryData from './countriesData.json';

function App() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [submitData, setSubmitData] = useState((localStorage.getItem('localData')===null)?[]:JSON.parse(localStorage.getItem('localData')));
  
  const [rowData,setRowData] = useState((localStorage.getItem('localData')===null)?[
      {id: 1,Name: 'Deep Singh',Email: 'deepsingh11421@gmail.com',Gender:'Female',DOB:'23-10-1999',Country:'India',City: 'Mathura'},
      {id: 2,Name: 'Akshat Mukhriya',Email: 'singh11421@gmail.com',Gender:'Male',DOB:'10-6-1999',Country:'India',City: 'Agra'},
      {id: 3,Name: 'Achintya Jaiswal',Email: 'deepsingh@gmail.com',Gender:'Female',DOB:'23-2-1999',Country:'India',City: 'Agra'}
  ]:JSON.parse(localStorage.getItem('localData')));

  const addRowHandler = () => {
    // setRowData(rowData => [...rowData,{id: '',Name: '',Email: '',Gender: '',DOB: '',Country: '',City: ''}]);
    gridApi.applyTransaction({add: [{id: '',Name: '',Email: '',Gender: '',DOB: '',Country: '',City: ''}]})
  }

  function onSubmitClicked() {
    var rowData = [];
    gridApi.forEachNode(node => rowData.push(node.data));
    setSubmitData(rowData);
    var localdata = []
    rowData.forEach(elem => localdata.push(JSON.stringify(elem)));
    localStorage.setItem('localData','['+localdata+']');
  }

  function onRemoveSelected() {
    var selectedData = gridApi.getSelectedRows();
    gridApi.applyTransaction({ remove: selectedData });
  }

  function onRemoveUnselected() {
    var rowData = [];
    gridApi.forEachNode(node => {
      if(node.selected === false){
        rowData.push(node.data)
      }
    });
    gridApi.applyTransaction({ remove: rowData });
  }

  const deleteRowHandler = (params) => {
    params.api.applyTransaction({remove: [params.data]});
  }

  const genderValueSetter = (params,e) => {
    // var index = rowData.findIndex(entry => entry===params.data)
    params.data.Gender = e.target.value;
    // var updatedData = [...rowData];
    // updatedData[index] = params.data;
    // setRowData(updatedData);
    params.api.refreshCells();
  }

  const cellGender = (params) => {
    return(
      <select value={params.value} className='gender' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => genderValueSetter(params,e)}>
        <option value='' disabled>Gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
      </select>
    )
  }

  const dobValueSetter = (params,e) => {
    var date = new Date(e._d).toLocaleDateString();
    date = date.split('/');
    date = date[1]+'-'+date[0]+'-'+date[2];
    // var index = rowData.findIndex(entry => entry===params.data)
    params.data.DOB = date;
    // var updatedData = [...rowData];
    // updatedData[index] = params.data;
    // setRowData(updatedData);
    params.api.refreshCells();
  }

  const cellDOB = (params) => {
    if(params.data.DOB === ''){
      return(
        <DatePicker style={{backgroundColor: 'transparent',border: 'none'}} placeholder="DOB" onChange={(e) => dobValueSetter(params,e)}/>
      )
    }else{
      return(
        <DatePicker style={{backgroundColor: 'transparent',border: 'none'}} defaultValue={moment(params.value ,'DD/MM/YYYY')} format="DD/MM/YYYY" onChange={(e) => dobValueSetter(params,e)}/>
      )
    }
  }

  const gridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  const gridReadySubmit = (params) => {
    params.api.sizeColumnsToFit();
  }

  const countryValueSetter = (params,e) => {
    // console.log(params);
    // var index = params.node.id;
    params.data.Country = e.target.value;
    params.data.City = 'rerender';
    console.log(params);
    // var updatedData = [...rowData];
    // updatedData[parseInt(index)] = params.data;
    // console.log(updatedData);
    // setRowData(updatedData);
    params.api.refreshCells();
    // params.api.redrawRows();
  }

  const cellCountry = (params) => {
    var options = [];
    for(let keys in countryData){
      options.push(keys);
    }
    var data = options.map(value => <option key={value} value={value}>{value}</option>)
    return(
      <select value={params.value} className='country' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => countryValueSetter(params,e)}>
        <option value="" disabled>Country</option>
        {data}
      </select>
    )
  }

  const cityValueSetter = (params,e) => {
    // var index = rowData.findIndex(entry => entry===params.data)
    // console.log(index);
    params.data.City = e.target.value;
    // var updatedData = [...rowData];
    // updatedData[index] = params.data;
    // setRowData(updatedData);
    params.api.refreshCells();
  }

  const cellCity = (params) => {
    if(params.data.City === 'rerender'){
      params.data.City = '';
      params.api.refreshCells();
    }
    var options = [];
    if(params.data.Country !== ''){
      for(let i=0;i<countryData[params.data.Country].length;i++){
        options.push(countryData[params.data.Country][i]);
      }
    }
    console.log(params)
    var data = options.map(value => <option key={Math.random()+params.data.id+value} value={value}>{value}</option>)
    
    return(
      <select value={params.data.City} className='city' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => cityValueSetter(params,e)}>
        <option value="" disabled>City</option>
        {data}
      </select>
    )
  }

  const cellDelete = (params) => {
    return(
      <img src="/bin.png" alt="DEL" height="20px" className="delRow" onClick={() => deleteRowHandler(params)}/>
    )
  }

  const nameValidation = (params) => {
    if(params.data.Name.length <= 0){
      return {
        backgroundColor: 'red'
      }
    }else if(params.data.Name.length < 3){
      return {
        backgroundColor: 'yellow'
      }
    }else{
      return {backgroundColor: 'transparent'}
    }
  }

  const idValidation = (params) => {
    if(params.data.id.length <= 0){
      return {
        backgroundColor: 'red'
      }
    }else{
      return {backgroundColor: 'transparent'}
    }
  }

  const emailValidation = (params) => {
    if(params.data.Email.length <= 0){
      return {
        backgroundColor: 'red'
      }
    }
    var x=params.data.Email;  
    var atposition=x.indexOf("@");  
    var dotposition=x.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
      return {backgroundColor: 'yellow'};  
    }  
    return {backgroundColor: 'transparent'};
  }

  const genderValidation = (params) => {
    if(params.data.Gender === ''){
      return {backgroundColor: 'red'}
    }else{
      return {backgroundColor: 'transparent'}
    }
  }

  const dobValidation = (params) => {
    console.log(params.data);
    if(params.data.DOB === ''){
      return {
        padding: 0,
        backgroundColor: 'red'
      }
    }else{
      return {
        padding: 0,
        backgroundColor: 'transparent'
      }
    }
  }

  const countryValidation = (params) => {
    if(params.data.Country === ''){
      return {
        backgroundColor: 'red'
      }
    }else{
      return {
        backgroundColor: 'transparent'
      }
    }
  }

  const cityValidation = (params) => {
    if(params.data.City === ''){
      return {
        backgroundColor: 'red'
      }
    }else{
      return {
        backgroundColor: 'transparent'
      }
    }
  }

  return (
    <div className="App">
      <div className="ag-theme-alpine" style={{ height: 280, width: 1200,margin: 'auto' }}>
        <Button onClick={addRowHandler} style={{margin: '10px 20px'}} type="default">Add Row</Button>
        <Button style={{margin: '10px 20px'}} type="default" onClick={onRemoveSelected}>Delete Selected Rows</Button>
        <Button style={{margin: '10px 20px'}} type="default" onClick={onRemoveUnselected}>Delete Non Selected Rows</Button>
        <Button style={{margin: '10px 20px'}} type="default" onClick={onSubmitClicked}>Submit</Button>
        <AgGridReact headerHeight={48}
          onGridReady={gridReady}
          rowSelection='multiple'
          rowData={rowData}>
          <AgGridColumn field="id" editable={true} resizable={true} pinned='left' checkboxSelection={true} sortable={true} filter={true} cellStyle={idValidation}></AgGridColumn>
          <AgGridColumn field="Name" editable={true} resizable={true} pinned='left' sortable={true} filter={true} cellStyle={nameValidation}></AgGridColumn>
          <AgGridColumn field="Email" editable={true} resizable={true} sortable={true} filter={true} cellStyle={emailValidation}></AgGridColumn>
          <AgGridColumn field="Gender" resizable={true} sortable={true} filter={true} cellRendererFramework={cellGender} cellStyle={genderValidation}></AgGridColumn>
          <AgGridColumn field="DOB" resizable={true} sortable={true} filter={true} cellRendererFramework={cellDOB} cellStyle={dobValidation}></AgGridColumn>
          <AgGridColumn field="Country" resizable={true} sortable={true} filter={true} cellRendererFramework={cellCountry} cellStyle={countryValidation}></AgGridColumn>
          <AgGridColumn field="City" resizable={true} sortable={true} filter={true} cellRendererFramework={cellCity} cellStyle={cityValidation}></AgGridColumn>
          <AgGridColumn headerName="" field="delete" resizable={true} cellRendererFramework={cellDelete}></AgGridColumn>
        </AgGridReact>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: 280, width: 1200,margin: 'auto' }}>
      <div style={{position: 'relative',zIndex: 10,marginTop: '70px'}}>
      <h3><b>Submitted Data</b></h3>
      </div>
        <AgGridReact headerHeight={48}
        onGridReady={gridReadySubmit}
          rowData={submitData}>
          <AgGridColumn field="id" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="Name" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="Email" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="Gender" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="DOB" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="Country" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="City" sortable={true} filter={true} ></AgGridColumn>
          
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
