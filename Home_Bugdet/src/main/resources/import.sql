INSERT INTO `home_budget`.`budget` (`name`, `user_id`) VALUES ('Test Budget Name 1', '1');
INSERT INTO `home_budget`.`budget` (`name`, `user_id`) VALUES ('Test Budget Name 2', '1');
INSERT INTO `home_budget`.`budget` (`name`, `user_id`) VALUES ('Test Budget Name 3', '1');
#INSERT INTO `home_budget`.`users` (`descriptions`, `active`, `password`, `username`) VALUES ('User Description test', '1', '{noop}1234', 'admin');
#INSERT INTO `home_budget`.`users` (`descriptions`, `active`, `password`, `username`) VALUES ('User 2 Description test', '1', '{noop}1234', 'user');
#INSERT INTO `home_budget`.`users` (`descriptions`, `active`, `password`, `username`) VALUES ('User 3 Description test', '1', '{noop}a', 'a');
INSERT INTO `home_budget`.`expenses_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('1000', 'Expenses Budget Name 1', '1');
INSERT INTO `home_budget`.`expenses_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('2000', 'Expenses Budget Name 2', '1');
INSERT INTO `home_budget`.`expenses_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('3000', 'Expenses Budget Name 3', '2');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-12-07', 'Expenses Details Descriptions 1.1', '101', 'Expenses Details Name 1.1', '1');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-12-06', 'Expenses Details Descriptions 1.2', '102', 'Expenses Details Name 1.2', '1');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-12-05', 'Expenses Details Descriptions 1.3', '103', 'Expenses Details Name 1.3', '1');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-12-04', 'Expenses Details Descriptions 1.4', '104', 'Expenses Details Name 1.4', '1');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-12-03', 'Expenses Details Descriptions 2.1', '201', 'Expenses Details Name 2.1', '2');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-12-02', 'Expenses Details Descriptions 2.2', '202', 'Expenses Details Name 2.2', '2');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-12-01', 'Expenses Details Descriptions 2.3', '203', 'Expenses Details Name 2.3', '2');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-11-30', 'Expenses Details Descriptions 2.4', '204', 'Expenses Details Name 2.4', '2');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-11-29', 'Expenses Details Descriptions 3.1', '301', 'Expenses Details Name 3.1', '3');
INSERT INTO `home_budget`.`expenses_details` (`date`, `descriptions`, `money`, `name`, `expenses_name_id`) VALUES ('2019-11-28', 'Expenses Details Descriptions 3.2', '302', 'Expenses Details Name 3.2', '3');
INSERT INTO `home_budget`.`income_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('1000', 'Income Budget Name 1', '1');
INSERT INTO `home_budget`.`income_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('2000', 'Income Budget Name 2', '1');
INSERT INTO `home_budget`.`income_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('3000', 'Income Budget Name 3', '1');
INSERT INTO `home_budget`.`income_basic_names` (`estimated_money`, `name`, `budget_id`) VALUES ('4000', 'Income Budget Name 4', '2');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-08', 'Income Details Descriptions 1.1', '110', 'Income Details Name 1.1', '1');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-07', 'Income Details Descriptions 1.2', '120', 'Income Details Name 1.2', '1');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-06', 'Income Details Descriptions 1.3', '130', 'Income Details Name 1.3', '1');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-05', 'Income Details Descriptions 1.4', '140', 'Income Details Name 1.4', '1');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-04', 'Income Details Descriptions 2.1', '210', 'Income Details Name 2.1', '2');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-03', 'Income Details Descriptions 2.2', '220', 'Income Details Name 2.2', '2');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-02', 'Income Details Descriptions 2.3', '230', 'Income Details Name 2.3', '2');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-02', 'Income Details Descriptions 2.4', '240', 'Income Details Name 2.4', '2');
INSERT INTO `home_budget`.`income_details` (`date`, `descriptions`, `money`, `name`, `income_name_id`) VALUES ('2019-12-02', 'Income Details Descriptions 3.1', '310', 'Income Details Name 3.1', '3');
#INSERT INTO mm_user_role VALUES (1, 1);
#INSERT INTO mm_user_role VALUES (2, 2);
#INSERT INTO mm_user_role VALUES (3, 1);
#INSERT INTO `home_budget`.`role` (`description`, `roles`) VALUES ('Role Description 1', 'ROLE_ADMIN');
#INSERT INTO `home_budget`.`role` (`description`, `roles`) VALUES ('Role Description 2', 'ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_PM');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
INSERT INTO `home_budget`.`users` (`email`, `name`, `password`, `username`, `active`) VALUES ('aaa@aaa.aaa', 'aaa', '$2a$10$vAhQOsQST4BGoTAtIdCJs.g2N7EVkeUkqDQXi2M.mD5yTfnaaw.we', 'aaa', true);
INSERT INTO `home_budget`.`users` (`email`, `name`, `password`, `username`, `active`) VALUES ('markov@markov.markov', 'markov', '$2a$10$o/85nEEIHJtUoClGZd6Uvexdw0giFyymlg.ZJVK7vjPmE/8TANISC', 'markov', true);
INSERT INTO `home_budget`.`user_roles` (`user_id`, `role_id`) VALUES ('1', '3');
INSERT INTO `home_budget`.`user_roles` (`user_id`, `role_id`) VALUES ('2', '3');