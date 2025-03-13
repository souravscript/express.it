import { Queue } from 'bull';
import Redis from 'ioredis';
import Expression from '../api/models/Expression.js';

const redis = new Redis();

export const expressionQueue = new Queue('expression', {
    redis,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    }
});

// Processors
expressionQueue.process('createExpression', async (job) => {
    try {
        const { content, photos, authorId } = job.data;
        const newExpression = await Expression.create({ content, photos, author: authorId });
        return newExpression;
    } catch (err) {
        console.error(`Error processing createExpression job: ${err.message}`);
        throw err;
    }
});

expressionQueue.process('updateExpression', async (job) => {
    try {
        const { expressionId, updates } = job.data;
        const expression = await Expression.findByIdAndUpdate(
            expressionId,
            updates,
            { new: true }
        ).populate('author', 'name email');
        return expression;
    } catch (err) {
        console.error(`Error processing updateExpression job: ${err.message}`);
        throw err;
    }
});

expressionQueue.process('deleteExpression', async (job) => {
    try {
        const { expressionId } = job.data;
        const expression = await Expression.findByIdAndDelete(expressionId);
        return expression;
    } catch (err) {
        console.error(`Error processing deleteExpression job: ${err.message}`);
        throw err;
    }
});

expressionQueue.process('likeExpression', async (job) => {
    try {
        const { expressionId, userId } = job.data;
        const expression = await Expression.findById(expressionId);
        if (!expression.likedBy.includes(userId)) {
            expression.likedBy.push(userId);
            expression.likes += 1;
            await expression.save();
        }
        return expression;
    } catch (err) {
        console.error(`Error processing likeExpression job: ${err.message}`);
        throw err;
    }
});

expressionQueue.process('unlikeExpression', async (job) => {
    try {
        const { expressionId, userId } = job.data;
        const expression = await Expression.findById(expressionId);
        if (expression.likedBy.includes(userId)) {
            expression.likedBy.pull(userId);
            expression.likes -= 1;
            await expression.save();
        }
        return expression;
    } catch (err) {
        console.error(`Error processing unlikeExpression job: ${err.message}`);
        throw err;
    }
});

// Error handling
expressionQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
});
