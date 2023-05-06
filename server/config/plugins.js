module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: "aws-s3",
            providerOptions: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_ACCESS_SECRET,
                region: "eu-west-1",
                params: {
                    Bucket: "inspired-gamer-bucket-ecommer",
                },
            },
        },
    },
});
