```landlord = {

    id:'',
    first_name:'',
    last_name:'',
    user_name: first_name + last_name,
    offers_list:[],
    offers_count: '',
    isVerified:'bool',
    isTrusted: 'bool'
}

```

```
tenant = {
    id:'',
    first_name:'',
    last_name:'',
    user_name: first_name + last_name,
    isVerified:'bool'
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
    rooms_count: '', --could be null,
    newBuilding :'bool',
    oldBuidling:'bool',
    hasBalcony:'bool',
    depositRequired:'bool'
    deposit_months: '',
    available_from: '',
    allIncluded:'bool',
    smokingAllowed :'bool',
    petsAllowed:'bool',
    facilities: {
        fridge:'bool',
        AC: 'bool',
        washing_machine: 'bool',
        wifi: 'bool',
        gas_heating: 'bool',
        dryer: 'bool',
        tv: 'bool',
        oven:'bool',
        stove:'bool',
        dishwasher: 'bool',
        microwave:'bool',
        fan:'bool',
        avgInternetSpeed:'float',
    }
    summary: '',

}
```
