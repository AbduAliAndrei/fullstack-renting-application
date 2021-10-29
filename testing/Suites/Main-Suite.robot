*** Settings ***
Suite Setup       Open Browser    ${URL}    ${BROWSER}
Suite Teardown    Close All Browsers
Library           SeleniumLibrary

 

*** Variables ***
${URL}            http://localhost:3000
${BROWSER}        Chrome
${USER_EMAIL}     abduabdu123@gmail.com
${USER_PASSWORD}    1234566

 

*** Test Cases ***
Check Private Route Redirects To Login
    Go To    ${URL}/profile
    ${current_url}=    Get Location
    Should Be Equal As Strings    ${current_url}    ${URL}/login

 

Test User Can Register
    Go To    ${URL}/register
    Enter Email    ${USER_EMAIL}
    Enter Password    ${USER_PASSWORD}
    Submit Details    register-btn
    ${current_url}=    Get Location
    Should Be Equal As Strings    ${current_url}    ${URL}/profile
    Click Button    logout-btn

 

Test User Can Login
    Go To    ${URL}/login
    Enter Email    ${USER_EMAIL}
    Enter Password    ${USER_PASSWORD}
    Submit Details    login-btn
    ${current_url}=    Get Location
    Should Be Equal As Strings    ${current_url}    ${URL}/profile
 

Test User Can Go To Private Routes
    Go To    ${URL}/profile
    ${current_url}=    Get Location
    Should Be Equal As Strings    ${current_url}    ${URL}/profile

 

Test User Can Delete Account
    Go To    ${URL}/profile
    Click Button    delete-account-btn
    ${current_url}=    Get Location
    Should Be Equal As Strings    ${current_url}    ${URL}/login

 

*** Keywords ***
Enter Email
    [Arguments]    ${email}
    Input Text    email    ${email}

 

Enter Password
    [Arguments]    ${password}
    Input Text    password    ${password}

 

Submit Details
    [Arguments]    ${btn-locator}
    Click Button    ${btn-locator}
 