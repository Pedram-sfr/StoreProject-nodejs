
module.exports={
    MongoIDPatern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: Object.freeze({
        USER: "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER"
    }),
    PERMISSIONS: Object.freeze({
        USER: ["profile"],
        ADMIN: ["all"],
        CONTENT_MANAGER: ["course","blog","product","category"],
        TEACHER: ["course","blog"],
        SUPPLIER: ["product"],
        ALL : "all"
    }),
    ACCESS_TOKEN_SECRET_KEY: "C8D5469348D57B0CE683AEFB36EEE433DF34D05C8C88ABF5C9ADDEA9B8612F56",
    REFRESH_TOKEN_SECRET_KEY: "A5BD777A031FC1757A997549C23F5DFCE7F5857F7C0E0D6E9FCE06062EA044ED",
    COOKIE_PARSER_SECRET_KEY: "CDF74F5FEE3912E630504E67B7823152858B55AD607BFCD42CD75CB48FB4AA4A"
}