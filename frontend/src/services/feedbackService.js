export const submitFeedback = async (data) => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Feedback submitted:', data);
            resolve({ success: true, message: 'Feedback received' });
        }, 1500);
    });
};
