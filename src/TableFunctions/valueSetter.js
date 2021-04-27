const genderValueSetter = (params,e) => {
    params.data.Gender = e.target.value;
    params.api.refreshCells();
  }

  const dobValueSetter = (params,e) => {
    var date = new Date(e._d).toLocaleDateString();
    date = date.split('/');
    date = date[1]+'-'+date[0]+'-'+date[2];
    params.data.DOB = date;
    params.api.refreshCells();
  }

  const countryValueSetter = (params,e) => {
    params.data.Country = e.target.value;
    params.data.City = 'rerender';
    params.api.refreshCells();
  }

  const cityValueSetter = (params,e) => {
    params.data.City = e.target.value;
    params.api.refreshCells();
  }

  const idValueSetter = (params,e) => {
    params.data.id = e.target.value;
    params.api.refreshCells();
  }

  const nameValueSetter = (params,e) => {
    params.data.Name = e.target.value;
    params.api.refreshCells();
  }

  const emailValueSetter = (params,e) => {
    params.data.Email = e.target.value;
    params.api.refreshCells();
  }

  const deleteRowHandler = (params) => {
    params.api.applyTransaction({remove: [params.data]});
  }

  export {idValueSetter,nameValueSetter,emailValueSetter,genderValueSetter,dobValueSetter,countryValueSetter,cityValueSetter,deleteRowHandler};