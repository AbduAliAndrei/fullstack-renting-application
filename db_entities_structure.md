```landlord = {                                                    

    id:'',
    first_name:'',
    last_name:'',
    user_name: first_name + last_name,
    offers_list:[],
    offers_count: '',
    verified:'bool',
    trusted: 'bool'
}

```

```
tenant = {
    id:'',
    first_name:'',
    last_name:'',
    user_name: first_name + last_name,
}
```

```
offer = {
    title: '',
    description: '',
    date_posted: '',
    images: [],
    price: '',
    price_currency: '',
    location: '',
    size: '',
    rooms_count: '', --could be null
    is_deposit:'bool'
    deposit_months: '',
    available_from: '',
    facilities: {
        AC: 'bool',
        washing_machine: 'bool',
        wifi: 'bool',
        gas_heating: 'bool',
        dryer, 'bool',
        tv: 'bool',
        dishwasher: 'bool',
    }
    summary: '',
    
}
```