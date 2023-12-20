import { prismaClient } from "../app/database.js";

const getState = async (req, res) => {
    try {
        const stateLed = await prismaClient.led.findFirst({
            select: {
                id: false,
                ledState: true
            }
        });

        if (!stateLed) {
            return res.status(400).json({
                status: "error",
                message: "No LED state found"
            });
        }

        res.json({
            stateLed: stateLed.ledState
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

const setState = async (req, res) => {
    try {

        const result = await prismaClient.led.update({
            where: {
                id: 1
            },
            data: {
                ledState: req.body.ledState
            },
            select: {
                ledState: true
            }
        });

        if (!result) {
            return res.status(400).json({
                status: "error",
                message: "Failed to update LED state"
            });
        }

        res.json({
            status: "success",
            stateLed: result.ledState
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

export default {
    getState,
    setState
};
