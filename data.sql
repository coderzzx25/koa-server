DROP TABLE IF EXISTS `coderzzx_menu_permission`;
CREATE TABLE `coderzzx_menu_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL DEFAULT 0 COMMENT '菜单ID',
  `permission_name` varchar(50) NOT NULL DEFAULT '' COMMENT '权限名称',
  `permission_value` varchar(50) NOT NULL DEFAULT '' COMMENT '权限值',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '数据状态:0-软删除；1-正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单权限表';

DROP TABLE IF EXISTS `coderzzx_menus`;
CREATE TABLE `coderzzx_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(50) NOT NULL DEFAULT '' COMMENT '页面名称',
  `url` varchar(50) NOT NULL DEFAULT '' COMMENT '页面url',
  `icon` varchar(50) NOT NULL DEFAULT '' COMMENT '页面图标',
  `grade` tinyint(1) NOT NULL DEFAULT 1 COMMENT '页面等级,1-一级页面；2-二级页面',
  `pid` int(11) NOT NULL DEFAULT 0 COMMENT '父级页面ID',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '数据状态:0-软删除；1-正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='页面表';

DROP TABLE IF EXISTS `coderzzx_roles`;
CREATE TABLE `coderzzx_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL DEFAULT '' COMMENT '角色名称',
  `menu_ids` varchar(255) NOT NULL DEFAULT '' COMMENT '菜单ID集合,关联menus表',
  `permission_ids` varchar(255) NOT NULL DEFAULT '' COMMENT '操作权限,关联menu_permission表',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '数据状态:0-软删除；1-正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

DROP TABLE IF EXISTS `coderzzx_users`;
CREATE TABLE `coderzzx_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT '密码',
  `role_id` int(11) NOT NULL DEFAULT 0 COMMENT '角色ID,关联roles表',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '数据状态:0-软删除；1-正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

INSERT INTO `coderzzx_menus` (`menu_name`, `url`, `icon`, `grade`, `pid`, `create_time`, `update_time`, `status`) VALUES ('数据概况', '/dashboard', 'PieChartOutlined', 1, 0, unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menus` (`menu_name`, `url`, `icon`, `grade`, `pid`, `create_time`, `update_time`, `status`) VALUES ('系统管理', '', 'SettingOutlined', 1, 0, unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menus` (`menu_name`, `url`, `icon`, `grade`, `pid`, `create_time`, `update_time`, `status`) VALUES ('角色管理', '/roles', 'TeamOutlined', 2, 2, unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menus` (`menu_name`, `url`, `icon`, `grade`, `pid`, `create_time`, `update_time`, `status`) VALUES ('菜单管理', '/menus', 'LinkOutlined', 2, 2, unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menus` (`menu_name`, `url`, `icon`, `grade`, `pid`, `create_time`, `update_time`, `status`) VALUES ('部门管理', '/departments', 'EditOutlined', 2, 2, unix_timestamp(NOW()), unix_timestamp(NOW()), 1);

INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (3, '查看角色', 'select_role', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (3, '添加角色', 'add_role', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (3, '编辑角色', 'edit_role', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (3, '删除角色', 'delete_role', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);

INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (4, '查看菜单', 'select_menu', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (4, '添加菜单', 'add_menu', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (4, '编辑菜单', 'edit_menu', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (4, '删除菜单', 'delete_menu', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);

INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (5, '查看部门', 'select_department', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (5, '添加部门', 'add_department', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (5, '编辑部门', 'edit_department', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);
INSERT INTO `coderzzx_menu_permission` (`menu_id`, `permission_name`, `permission_value`, `create_time`, `update_time`, `status`) VALUES (5, '删除部门', 'delete_department', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);

INSERT INTO `coderzzx_roles` (`role_name`, `menu_ids`, `permission_ids`, `create_time`, `update_time`, `status`) VALUES ('超级管理员', '1,2,3,4,5', '1,2,3,4,5,6,7,8,9,10,11,12', unix_timestamp(NOW()), unix_timestamp(NOW()), 1);

INSERT INTO `coderzzx_users` (`username`, `password`, `role_id`, `create_time`, `update_time`, `status`) VALUES ('admin', 'e10adc3949ba59abbe56e057f20f883e', 1, unix_timestamp(NOW()), unix_timestamp(NOW()), 1);

-- 以上数据为系统初始化必须数据，不可删除
