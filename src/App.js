import React,{useState} from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import {AgGridReact,AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {cellId,cellName,cellGender,cellDOB,cellCountry,cellCity,cellDelete,cellEmail} from './TableFunctions/cellRender';
import {idValidation,nameValidation,emailValidation,genderValidation,dobValidation,countryValidation,cityValidation} from './TableFunctions/cellStyles';

function App() {
  const [gridApi, setGridApi] = useState(null);
  const [submitData, setSubmitData] = useState((localStorage.getItem('localData')===null)?[]:JSON.parse(localStorage.getItem('localData')));
  
  const [rowData,setRowData] = useState((localStorage.getItem('localData')===null)?[
      {id: 1,Name: 'Deep Singh',Email: 'deepsingh11421@gmail.com',Gender:'Female',DOB:'23-10-1999',Country:'India',City: 'Mathura'},
      {id: 2,Name: 'Sagar Singh',Email: 'singh11421@gmail.com',Gender:'Male',DOB:'10-6-1999',Country:'India',City: 'Agra'},
      {id: 3,Name: 'Achintya Jaiswal',Email: 'deepsingh@gmail.com',Gender:'Female',DOB:'23-2-1999',Country:'India',City: 'Agra'}
  ]:JSON.parse(localStorage.getItem('localData')));

  const addRowHandler = () => {
    gridApi.applyTransaction({add: [{id: null,Name: null,Email: null,Gender: null,DOB: null,Country: null,City: null}]})
  }

  function onSubmitClicked() {
    var rowData = [];
    var errors = false;
    gridApi.forEachNode(node => {
      for(let key in node.data){
        if(node.data[key] === null){
          node.data[key] = '';
        }
      }
      if(node.data.id==='' || node.data.Name==='' || node.data.Email===''|| node.data.Gender===''|| node.data.DOB===''|| node.data.Country===''|| node.data.City===''){
        errors = true;
      }
      rowData.push(node.data)
    });
    if(errors){
        alert('Fix the errors');
        gridApi.refreshCells();
        return;
    }
    setSubmitData(rowData);
    var localdata = []
    rowData.forEach(elem => localdata.push(JSON.stringify(elem)));
    localStorage.setItem('localData','['+localdata+']');
    alert('Submitted');
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

  const gridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }

  const gridReadySubmit = (params) => {
    params.api.sizeColumnsToFit();
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
          <AgGridColumn field="id" resizable={true} pinned='left' checkboxSelection={true} sortable={true} filter={true} cellRendererFramework={cellId} cellStyle={idValidation}></AgGridColumn>
          <AgGridColumn field="Name" resizable={true} pinned='left' sortable={true} filter={true} cellRendererFramework={cellName} cellStyle={nameValidation}></AgGridColumn>
          <AgGridColumn field="Email" resizable={true} sortable={true} filter={true} cellRendererFramework={cellEmail} cellStyle={emailValidation}></AgGridColumn>
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
