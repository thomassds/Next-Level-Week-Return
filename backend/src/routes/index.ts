import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from '../adpters/nodemailer/nodemailer-mail-adapter';
import { prisma } from '../prisma';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { GetFeedbackService } from '../services/get-feedback-service';
import { SubmitFeedbackService } from '../services/submit-feedback-service';

const routes  = express.Router();

routes.post('/feedbacks',  async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository(); 
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository, nodemailerMailAdapter
    );

    const feedback = await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    });
    
    return res.status(201).json(feedback);
})

routes.get('/feedbacks', async(req, res) => {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository(); 

    const getFeedbackService = new GetFeedbackService(
        prismaFeedbacksRepository,
    );

    const feedback = await prisma.feedback.findMany();

    return res.json(feedback);
});

export { routes };