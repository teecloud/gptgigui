exports.config = {
    runner: 'local',
    specs: ['./test/appium/**/*.test.js'],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:automationName': 'UiAutomator2',
        browserName: 'Chrome'
    }],
    logLevel: 'info',
    services: ['appium'],
    framework: 'mocha',
    mochaOpts: {
        timeout: 60000
    }
};
