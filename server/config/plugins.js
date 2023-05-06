module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: "aws-s3",
            providerOptions: {
                accessKeyId: "AKIAUWNDBFKZUDV7YJKW",
                secretAccessKey: "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",
                region: "eu-west-1",
                params: {
                    Bucket: "inspired-gamer-bucket-ecommer",
                },
            },
        },
    },
});