INSERT INTO `home_budget`.`budget_income` (`date`, `descriptions`, `money`) VALUES ('2019-01-01', 'Test income budget', '1500');
INSERT INTO `home_budget`.`budget_income` (`date`, `descriptions`, `money`) VALUES ('2019-01-02', 'Test 2 income budget', '1400');
INSERT INTO `home_budget`.`income_details` (`estimate`, `name`, `user_id`) VALUES ('2000', 'Test Income details', '1');
INSERT INTO `home_budget`.`income_details` (`estimate`, `name`, `user_id`) VALUES ('2200', 'Test 2 income details', '1');
INSERT INTO `home_budget`.`user` (`descriptions`, `is_active`, `password`, `username`) VALUES ('Test user', '1', 'admin', 'admin');
INSERT INTO `home_budget`.`income_basic_names` (`name`, `user_id`) VALUES ('Test Income Basic Names', '1');
INSERT INTO `home_budget`.`income_basic_names` (`name`, `user_id`) VALUES ('Test 2 Income Basic Names', '1');
UPDATE `home_budget`.`budget_income` SET `user_id` = '1' WHERE (`income_budget_id` = '1');
UPDATE `home_budget`.`budget_income` SET `user_id` = '1' WHERE (`income_budget_id` = '2');