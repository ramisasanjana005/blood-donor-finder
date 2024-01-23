import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Purchase from '../Purchase/Purchase';

const Store = () => {
    const [bloodGroups, setBloodGroups] = useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        // Fetch data from the server
        axios.get('http://localhost:5000/api/donors')
            .then(response => setBloodGroups(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDonorChange = (e) => {
        setSelectedBloodGroup(e.target.value);
    };

    const handleDateFilterChange = (e) => {
        setDateFilter(e.target.value);
    };

    const filteredData = bloodGroups.filter(donor =>
        (selectedBloodGroup === '' || donor.blood_group === selectedBloodGroup) &&        
        (dateFilter === '' || new Date(donor.last_donation_date).toDateString() === new Date(dateFilter).toDateString())
    );
/*
    const totalPrice = filteredData.length * 5; // Replace with your desired price per row
    const handlePurchase = () => {
        // Implement logic for what should happen after successful purchase
        console.log('Purchase successful!');
    };
*/

    return (
        <div>
            <label htmlFor="donorSelect">Select Blood Group:</label>
            <select id="donorSelect" value={selectedBloodGroup} onChange={handleDonorChange}>
                <option value="">All</option>
                {/* Assuming contracts is an array of unique contract symbols */}
                {Array.from(new Set(bloodGroups.map(donor => donor.blood_group))).map(bloodGroup => (
                    <option key={bloodGroup} value={bloodGroup}>{bloodGroup}</option>
                ))}
            </select>
            
            {/*<input type="text" placeholder="Filter by Blood Group" value={bloodGroupFilter} onChange={handleBloodGroupFilterChange} />*/}
            <label htmlFor="dateFilter">Filter by Date:</label>
            <input type="date" value={dateFilter} onChange={handleDateFilterChange} />
            {/*<Purchase totalPrice={totalPrice} handlePurchase={handlePurchase} filteredData={filteredData} />*/}

            <table>
                <thead>
                    <tr>
                        <th>Blood Group</th>
                        <th>Last Donation Date</th>
                        {/* Add other table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(donor => (
                        <tr key={donor._id}>
                            <td>{donor.blood_group}</td>
                            <td>{new Date(donor.last_donation_date).toLocaleDateString()}</td>
                            {/* Add other table data cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Store;
