const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
    try {
        // Extracting the 'data' array from the request body
        const data = req.body.data;


        const userId = "kota_harshith_13062004";
        const email = "kotaharshith13@gmail.com";
        const rollNumber = "22BCE5241";

        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        let alphabeticalChars = '';

        for (const item of data) {
            if (!isNaN(item)) {
                const num = parseInt(item, 10);
                if (num % 2 === 0) {
                    evenNumbers.push(String(num)); //storing as a string
                } else {
                    oddNumbers.push(String(num)); //storing as a string
                }
                sum += num;
            }
            //if the item is an alphabet
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); //converting to uppercase
                alphabeticalChars += item;
            }
            //else it is considered as a special character
            else {
                specialCharacters.push(item);
            }
        }


        //reverse the string of alphabetical characters
        const reversedAlphabets = alphabeticalChars.split('').reverse().join('');
        let concatString = '';
        //applying alternating caps for reversed string
        for (let i = 0; i < reversedAlphabets.length; i++) {
            if (i % 2 === 0) {
                concatString += reversedAlphabets[i].toUpperCase();
            } else {
                concatString += reversedAlphabets[i].toLowerCase();
            }
        }


        //construction of response
        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum), //returning sum as a string
            concat_string: concatString
        };

        //sending the successful response with a 200 status code
        res.status(200).json(response);

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            is_success: false,
            error_message: "An internal server error occurred."
        });
    }
});

//Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});