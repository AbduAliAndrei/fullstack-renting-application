* Settings *
Suite Setup       Wait Until Keyword Succeeds    10x    10s    Open Browser    ${URL}    ${BROWSER}
Suite Teardown    Close All Browsers
Library           SeleniumLibrary
 

* Variables *
${URL}            http://localhost:3001
${BROWSER}        Chrome
${USER_EMAIL}     abduabdu123@gmail.com
${USER_PASSWORD}    1234566

 

* Test Cases *
Check Private Route Redirects To Login
    Go To    ${URL}/profile
    ${current_url}=    Get Location
    Should Be Equal As Strings    ${current_url}    ${URL}/login

Test User Can Login
    Set Selenium Speed	2 seconds
    Go To    ${URL}/login
    Enter Email    ${USER_EMAIL}
    Enter Password    ${USER_PASSWORD}
    Submit Details    login-btn

Test User Can Go To Private Routes
    Set Selenium Speed	2 seconds
    Go To    ${URL}/profile
    ${current_url}=    Get Location
    Wait Until Keyword Succeeds    10x    5s    Wait Until profile
 

* Keywords *
Wait Until profile
    ${current_url}=    Get Location
    Should Be Equal As Strings    ${current_url}    ${URL}/profile

 
Enter Email
    [Arguments]    ${email}
    Input Text    email    ${email}

 

Enter Password
    [Arguments]    ${password}
    Input Text    password    ${password}

 

Submit Details
    [Arguments]    ${btn-locator}
    Click Button    ${btn-locator}