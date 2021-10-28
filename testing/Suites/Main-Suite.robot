*** Settings ***
Suite Setup     begin
Suite Teardown  end
*** Test Cases ***
t1
    Run Project
    Test User Cant Go To Private Routes
    Register A New User
    Test User Can Login
    Test User Can Go To Private Routes
    Test User Can Login Out
    Delete Project
    Close All Connections

t2
    Log    Hell

*** Keywords ***
begin
    Log     begin

end
    Log     end
