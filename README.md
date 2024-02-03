
**HOW TO USE**<br>
CLONE THE REPOSITORY<br>
CHANGE THE DB PASSWORD TO YOUR OWN DB PASSWORD<br>
RUN npm install<br>
RUN npm run start:<br>
WHERE TO ADD WHAT<br>
SQL QUERIES IN CONTROLLER & SERVICES(Better to write in services for separation of concern)<br>
Controllers guide the routes<br>
Analytics is hidden from plain user. So only specific user can access /analytics route<br>
<img width="564" alt="Draw io" src="https://github.com/ssrakshe/FMS-Backend/assets/66088285/99e592c4-7845-45b8-a006-fb3797b32109">

QUERIES LIST:<br>

QUERY TO FIND OUT THE TOP 3 MOST RECENT MAINTENANCE RECORDS FOR EACH VEHICLE<br>

Query: WITH MaintenanceRanked AS ( SELECT m.*, v.make, v.model, ROW_NUMBER() OVER (PARTITION BY m.vehicle_id ORDER BY m.maintain_date DESC) AS rn FROM Maintenance m INNER JOIN Vehicle v ON m.vehicle_id = v.vehicle_id ) SELECT * FROM MaintenanceRanked WHERE rn <= 3;<br>

Description: With each record given a row number based on the maintenance date, this SQL query generates a ranked list of car maintenance records. It then filters the results to show only the top 3 most recent maintenance entries for each vehicle, along with information about the brand and model of the vehicle. It gives a clear and efficient means of locating and retrieving maintenance records for several different cars.<br>


QUERY TO FIND OUT THE TOTAL DISTANCE COVERED BY EACH VEHICLE ALONG WITH ITS MAKE AND MODEL<br>

Query: SELECT v.vehicle_id, v.make, v.model, SUM(t.distance) AS total_distance FROM Vehicle v LEFT JOIN Trip t ON v.vehicle_id = t.vehicle_id GROUP BY v.vehicle_id, v.make, v.model;<br>

Description: The total distance driven by each vehicle is obtained using this SQL query, which also returns details on the car's make, model, ID, and the total distance from related trips. It aggregates the results by vehicle ID, make, and model to get the total distance for each car. A LEFT JOIN is used to guarantee that all vehicles are included in the result, even if they have no recorded trips.<br>

QUERY TO CALCULATE RUNNING TOTAL OF FUEL COST PER VEHICLE<br>

Query: SELECT vehicle_id, fuel_log_date, fuel_expense, SUM(fuel_expense) OVER (PARTITION BY vehicle_id ORDER BY fuel_log_date) AS running_total_fuel_cost FROM FuelLog ORDER BY vehicle_id, fuel_log_date;<br>

Description: The vehicle ID, fuel log date, gasoline expense for each entry, and a running total of fuel expenses divided by vehicle ID and sorted by fuel log date are all displayed by this SQL query, which extracts data from a "FuelLog" table. Sorted by vehicle ID and fuel log date, the query determines the total fuel cost for every car over time.<br>

:

QUERY TO CREATE VIEW ’TRIP_LOG’ TO FIND INFORMATION RELATED TO TRIP.<br>

Query: CREATE VIEW trip_log AS SELECT Driver.driver_id, Driver.first_name, Driver.last_name, name, description, Trip.start_date, Trip.end_date,Vehicle.trip_id, Vehicle.make, Vehicle.model FROM trip_type JOIN Driver ON Driver.trip_id=trip_type.trip_id JOIN Vehicle ON Vehicle.trip_id=trip_type.trip_id JOIN Trip ON Trip.trip_id=trip_type.trip_id ORDER BY Driver.driver_id;<br>

SELECT * FROM trip_log;<br>

Description :<br>

The query shows a view named as “trip_log” storing information of driver, vehicle and trip details by retrieving details from Driver, Vehicle and Trip table.<br>

QUERY TO FIND TOTAL COST FOR EACH MAINTENANCE DESCRIPTION<br>

Query: SELECT description AS Vehicle_maintenance, SUM(cost) AS TOTAL_COST FROM Maintenance GROUP BY description;<br>

Description :<br>

Query shows total cost of vehicle’s maintenance in each description category from the Maintenance table.<br>

QUERY TO FIND DISTANCE COVERED BY DRIVER ON TRIP.<br>

Query :<br>

SELECT Trip.trip_id, Trip.driver_id, (SELECT location.name FROM location WHERE location.trip_id = Trip.trip_id) AS Location_name, trip_type.name AS City_name, Trip.distance FROM Trip JOIN Driver ON Driver.driver_id = Trip.driver_id JOIN trip_type ON trip_type.trip_id = Trip.trip_id;<br>

Description :<br>

Query shows the distance covered by the driver on the trip along with information of location_name, city and driver_id and trip_id.<br>

Query to retrieve the trip_id & location whose location has greater longitude than the latitude<br>
Query: select trip.trip_id, location.name from trip,location where trip.trip_id=location.trip_id and location.longitude > location.latitude;<br>

Description: Finding the trips which are having greater longitude than latitude to make sure the trip is east-west direction oriented location as per the choice of user. :<br>

Query to calculate the total distance traveled by a vehicle during a specified time period<br>
Query: SELECT SUM(trip.distance) FROM trip,vehicle WHERE vehicle.vehicle_id = '1FTEW1E84AF057953' AND trip.start_date BETWEEN '7/11/2022' AND '7/23/2022';<br>

Description: Calculating the total distance traveled by specific vehicle by start date during a specific time period. :<br>

Query to retrieve the count of vehicles-make of the vehicles which are in working status.<br>
Query: SELECT make , COUNT(*) AS Count FROM vehicle where current_status='Working' GROUP BY make;<br>

Description: It will retrieve the count of vehicles-make of the vehicles which are in working status. It’s using group by function to make a group & count to specify the type of vehicles-make is under working condition. :<br>

Query that shows the vehicle ID, license plate, and capacity of each vehicle that is currently not working.<br>
QUERY:<br>

SELECT vehicle_id, license_plate, capacity FROM Vehicle WHERE current_status = 'Not Working';<br>

Description:<br>

The query retrieves the vehicle ID, license plate and capacity of each vehicle that are currently not in use, as in ‘Not Working’.<br>

:

11.Query that shows which drivers took which trips and the drivers details QUERY:<br>

SELECT d.driver_id, d.trip_id, first_name, last_name, license_number, contact_number FROM Trip t INNER JOIN Driver d ON t.trip_id = d.trip_id;<br>

Description:<br>

The query selects the driver ID, trip ID, first name, last name, license number and contact number from the tables Trip and Driver. This is to show which driver took which trip and to show the related information about the driver who took the trip.<br>

:

Query that shows which vehicles got which maintenance and the details of that maintenance<br>
QUERY:<br>

SELECT vehicle_id, m.maintenance_id, mt.maintenance_type_id, name, mt.description FROM Maintenance m INNER JOIN MaintenanceType mt ON m.maintenance_id = mt.maintenance_id ;<br>

Description:<br>

This query selects vehicle ID, maintenance id, maintenance type ID, maintenance descriptive name, and the maintenance description from the tables Maintenance and MaintenanceType. The purpose of the query is to show which vehicle got which maintenance type and show the related information about each maintenance that was performed on each vehicle.<br>

:

Create a SQL query to compute running average total for fuel_expense and total_cost<br>
Description: For the running average of fuel_expense and total_cost, the query orders the rows by fuel_log_date in ascending order. It uses a window frame that includes all rows from the start of the result set up to and including the current row. This allows it to generate a running average that reflects the cumulative average values for each row based on the chronological order of fuel_log_date. The result set will contain the original columns alongside the running average values for fuel_expense and total_cost, presenting a useful summary of expenditure and total cost trends over time in the fuel log data.<br>

Query:<br>

SELECT fuel_log_id, fuel_log_date, fuel_quantity, distance, AVG(fuel_expense) OVER (ORDER BY fuel_log_date) AS running_avg_fuel_expense, AVG(total_cost) OVER (ORDER BY fuel_log_date) AS running_avg_total_cost FROM fuellog ORDER BY fuel_log_date;<br>

Create SQL that calculates the total fuel expense for each driver and trip type combination<br>
Description: This SQL query summarizes the total fuel expenses for different trips by grouping them based on the driver and trip type. It calculates the sum of fuel expenses for each unique combination of a driver and trip type, providing a concise overview of the fuel costs associated with various trip categories and individual drivers. This type of query can be useful for cost analysis and resource allocation in a transportation or logistics context.<br>

Query: SELECT driver_id, trip_type_id, SUM(fuel_expense) AS total_fuel_expense FROM trip GROUP BY driver_id, trip_type_id;<br>

Create a running average for the total cost of a trip based on the quarter of the year it took place.<br>
Description: This SQL query calculates the running average of total trip costs for the year 2022, partitioned by quarters and ordered by the trip start date. It first aggregates trip data by quarter and start date, summing up fuel expenses for each group. Then, it computes the running average of these total costs within each quarter, providing insights into how trip expenses evolve over time. This analysis helps identify trends and fluctuations in costs, with a focus on quarterly breakdown for the year 2022.<br>

Query: SELECT quarter, AVG(total_cost) OVER (PARTITION BY quarter ORDER BY start_date) AS running_avg_total_cost FROM ( SELECT QUARTER(start_date) AS quarter, start_date, SUM(fuel_expense) AS total_cost FROM trip WHERE YEAR(start_date) = 2022 GROUP BY quarter, start_date ) AS subquery ORDER BY quarter, start_date;<br>
