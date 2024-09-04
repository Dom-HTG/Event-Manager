const express = require('express');

const Login = (req, res) => {
    const { email, password } = req.body;
    res.send({ "email": email, "password": password });
}