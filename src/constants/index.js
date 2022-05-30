const constants = {
    /**
     * App title
     */
    APP_TITLE: "Bulletin Board",
    VALIDATION: {
        NAME: {
            REQUIRE: true,
            MAX: 100,
            MIN: 0
        },
        EMAIL: {
            REQUIRE: true,
            MAX: 100,
            MIN: 0
        },
        PASS: {
            REQUIRE: true,
            MIN: 8,
        },
        PH: {
            REQUIRE: true,
            MAX: 11,
            MIN: 1
        },
        PROFILE: {
            REQUIRE: true,
            MAX: 2048 * 2048
        },
        TITLE: {
            REQUIRE: true,
            MAX: 255,
        },
        DESCRIPT: {
            REQUIRE: true,
        },
        CSV: {
            REQUIRE: true,
        }
    }
};



export default constants;