import {idValueSetter,nameValueSetter,emailValueSetter,genderValueSetter,dobValueSetter,countryValueSetter,cityValueSetter,deleteRowHandler} from './valueSetter.js';
import countryData from '../countriesData.json';
import moment from 'moment';
import binImg from '../Assets/bin.png';
import { DatePicker } from 'antd';

const cellGender = (params) => {
    if(params.value === null){
      return(
        <select value='' className='gender' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => genderValueSetter(params,e)}>
          <option value='' disabled>Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
      )
    }else{
      return(
        <select value={params.value} className='gender' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => genderValueSetter(params,e)}>
          <option value='' disabled>Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
      )
    }
  }

  const cellDOB = (params) => {
    if(params.data.DOB === '' || params.data.DOB === null){
      return(
        <DatePicker style={{backgroundColor: 'transparent',border: 'none'}} placeholder="DOB" onChange={(e) => dobValueSetter(params,e)}/>
      )
    }else{
      return(
        <DatePicker style={{backgroundColor: 'transparent',border: 'none'}} defaultValue={moment(params.value ,'DD/MM/YYYY')} format="DD/MM/YYYY" onChange={(e) => dobValueSetter(params,e)}/>
      )
    }
  }

  const cellCountry = (params) => {
    var options = [];
    for(let keys in countryData){
      options.push(keys);
    }
    var data = options.map(value => <option key={value} value={value}>{value}</option>)
    if(params.value === null){
      return(
        <select value='' className='country' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => countryValueSetter(params,e)}>
          <option value="" disabled>Country</option>
          {data}
        </select>
      )
    }else{
      return(
        <select value={params.value} className='country' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => countryValueSetter(params,e)}>
          <option value="" disabled>Country</option>
          {data}
        </select>
      )
    }
  }

  const cellCity = (params) => {
    if(params.data.City === 'rerender'){
      params.data.City = '';
      params.api.refreshCells();
    }
    var options = [];
    if(params.data.Country !== null && params.data.Country !== ''){
      for(let i=0;i<countryData[params.data.Country].length;i++){
        options.push(countryData[params.data.Country][i]);
      }
    }
    var data = options.map(value => <option key={Math.random()+params.data.id+value} value={value}>{value}</option>)
    
    if(params.data.City === null){
      return(
        <select value='' className='city' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => cityValueSetter(params,e)}>
          <option value="" disabled>City</option>
          {data}
        </select>
      )
    }else{
      return(
        <select value={params.data.City} className='city' style={{border:'none',width:'100%',background: 'transparent'}} onChange={(e) => cityValueSetter(params,e)}>
          <option value="" disabled>City</option>
          {data}
        </select>
      )
    }
  }

  const cellId = (params) => {
    if(params.data.id === null){
     return (
       <input type="text" placeholder="Id" className="inputCell" value='' style={{width: '100%',border:'none',backgroundColor:'transparent'}} onChange={(e) => idValueSetter(params,e)}/>
     )
    }else{
     return (
       <input type="text" placeholder="Id" className="inputCell" value={params.data.id} style={{width: '100%',border:'none',backgroundColor:'transparent'}} onChange={(e) => idValueSetter(params,e)}/>
     )
    }
   }

   const cellName = (params) => {
    if(params.data.Name === null){
     return (
       <input type="text" placeholder="Name" className="inputCell" value='' style={{width: '100%',border:'none',backgroundColor:'transparent'}} onChange={(e) => nameValueSetter(params,e)}/>
     )
    }else{
     return (
       <input type="text" placeholder="Name" className="inputCell" value={params.data.Name} style={{width: '100%',border:'none',backgroundColor:'transparent'}} onChange={(e) => nameValueSetter(params,e)}/>
     )
    }
   }

   const cellEmail = (params) => {
    if(params.data.Email === null){
     return (
       <input type="text" placeholder="Email" className="inputCell" value='' style={{width: '100%',border:'none',backgroundColor:'transparent'}} onChange={(e) => emailValueSetter(params,e)}/>
     )
    }else{
     return (
       <input type="text" placeholder="Email" className="inputCell" value={params.data.Email} style={{width: '100%',border:'none',backgroundColor:'transparent'}} onChange={(e) => emailValueSetter(params,e)}/>
     )
    }
   }

   const cellDelete = (params) => {
    return(
      <img src={binImg} alt="DEL" height="20px" className="delRow" onClick={() => deleteRowHandler(params)}/>
    )
  }

  export {cellId,cellName,cellGender,cellDOB,cellCountry,cellCity,cellDelete,cellEmail};