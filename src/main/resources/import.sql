INSERT INTO `home_budget`.`budget` (`name`, `user_id`) VALUES ('Marek Test Budget Name', '1');
INSERT INTO `home_budget`.`budget` (`name`, `user_id`) VALUES ('Marek 2 Test Budget Name', '2');
INSERT INTO `home_budget`.`user` (`descriptions`, `is_active`, `password`, `username`) VALUES ('User Description test', '1', '1234', 'admin');
INSERT INTO `home_budget`.`user` (`descriptions`, `is_active`, `password`, `username`) VALUES ('User 2 Description test', '1', '1234', 'user');
INSERT INTO `home_budget`.`expenses_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('1000', 'Expenses Budget Name 1', '1');
INSERT INTO `home_budget`.`expenses_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('2000', 'Expenses Budget Name 2', '1');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-01-01', 'Expenses Details Descriptions 1', '1000', 'Expenses Details Name 1', '1');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-02-02', 'Expenses Details Descriptions 1', '2000', 'Expenses Details Name 2', '1');
INSERT INTO `home_budget`.`income_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('1000', 'Income Budget Name 1', '1');
INSERT INTO `home_budget`.`income_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('2000', 'Income Budget Name 2', '1');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-01-01', 'Income Details Descriptions 1', '1000', 'Income Details Name 1', '1');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-02-02', 'Income Details Descriptions 2', '2000', 'Income Details Name 2', '1');
INSERT INTO mm_user_role VALUES (1, 1);
INSERT INTO mm_user_role VALUES (2, 1);
INSERT INTO `home_budget`.`role` (`description`, `role_name`) VALUES ('Role Description 1', 'admin');
INSERT INTO `home_budget`.`role` (`description`, `role_name`) VALUES ('Role Description 2', 'admin');
