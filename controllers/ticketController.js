const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const USER = require("../models/User");
const Wallet = require("../models/Wallet");
const Ticket = require("../models/Ticket");


async function createTicket(req,res,next){
    try {
        const { wallet_id, time_after, station_from, station_to } = req.body;

        // Check if the user's wallet exists
        const wallet = await Wallet.findOne({ wallet_id });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        // Calculate ticket cost based on station fares and create stations array
        const stations = []; // Here you would need to implement logic to calculate stations
        const ticketCost = calculateTicketCost(stations);

        // Check if the user has sufficient balance
        if (wallet.wallet_balance < ticketCost) {
            const shortageAmount = ticketCost - wallet.wallet_balance;
            return res.status(402).json({ message: `recharge amount: ${shortageAmount} to purchase the ticket` });
        }

        // Deduct ticket cost from wallet balance
        wallet.wallet_balance -= ticketCost;
        await wallet.save();

        // Create a new ticket
        const newTicket = new Ticket({
            ticket_id: generateUniqueTicketId(), // You need to implement this function
            wallet_id,
            balance: wallet.wallet_balance,
            stations
        });

        // Save the ticket to the database
        const savedTicket = await newTicket.save();

        // Respond with the created ticket
        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Error purchasing ticket:', error);
        res.status(500).json({ error: 'Failed to purchase ticket' });
    }
}



module.exports = {
    createTicket,
}
