*** Settings ***
Suite Setup       Open Browser    ${URL}    ${BROWSER}
Suite Teardown    Close All Browsers
Library           SeleniumLibrary

 

*** Variables ***
${URL}            http://localhost:3000
${BROWSER}        Chrome

 

*** Test Cases ***
t1
    Check Private Route Redirects To Login
    #    Test User Can Login
    #    Test User Can Go To Private Routes
    #    Test User Can Login Out

 

*** Keywords ***
Check Private Route Redirects To Login
    Go To    ${URL}/profile
    ${ur}=    Get Location
    Should Be Equal As Strings    ${ur}    ${URL}/login

 

Test User Can Login
    Go To    ${URL}/login
    Enter Email    andrei@gmail.com
    Enter Password    123456

 

Test User Can Go To Private Routes
    Go To    ${URL}/profile
    ${ur}=    Get Location
    Should Be Equal As Strings    ${ur}    ${URL}/profile

 

Enter Email
    [Arguments]    ${email}
    Input Text    email    ${email}

 

Enter Password
    [Arguments]    ${password}
    Input Text    password    ${password}

 

Submit Details
    Click Button    login-btn