/*
 Navicat Premium Data Transfer

 Source Server         : Lumina
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : blog_project

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 24/12/2023 16:12:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'Lumina', '1234', '1710884533@qq.com', '2023-12-17 17:04:34');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `author` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ctime` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `category_id` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `author_id` int(0) NOT NULL DEFAULT 1,
  `read_num` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `u_author`(`author`) USING BTREE,
  INDEX `author_fk`(`author_id`) USING BTREE,
  INDEX `category_fk`(`category_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'Vue：构建高效、灵活、可维护的用户界面的JavaScript库', 'Lumina', '2023-12-07', 'Vue.js是一种基于JavaScript的开源前端框架，它可以帮助开发人员构建高效、灵活、可维护的Web应用程序。Vue.js的设计理念 是简单易用，它提供了一些简洁、灵活的API，使得开发人员可以快速地构建Web界面。\r\n\r\n## Vue.js的特点\r\n\r\n+   响应式：Vue.js采用了响应式的设计，即当数据发生变化时，页面会自动更新。这种设计使得开发人员可以更加专注于业务逻辑，而不需要手动更新页面。\r\n+   组件化：Vue.js采用了组件化的设计，将页面拆分成多个组件，每个组件可以独立开发、测试和维护。这种设计使得代码更加清晰、可复用性更高。\r\n+   轻量级：Vue.js的体积非常小，只有20KB左右，因此加载速度非常快。这种设计使得Vue.js可以轻松地集成到其他项目中。\r\n+   易学易用：Vue.js提供了简洁、灵活的API，使得开发人员可以快速上手，不需要花费太多时间学习。\r\n\r\n## Vue.js的应用领域\r\n\r\n1.  Web应用程序开发：Vue.js可以帮助开发人员构建高效、灵活、可维护的Web应用程序，如电商网站、社交媒体应用程序等。\r\n2.  移动应用程序开发：Vue.js可以使用框架如Weex进行移动应用程序的开发，实现跨平台开发。\r\n3.  单页应用程序开发：Vue.js可以帮助开发人员构建单页应用程序，实现流畅的用户体验。\r\n4.  插件开发：Vue.js提供了插件机制，使得开发人员可以轻松地扩展Vue.js的功能。\r\n\r\n## Vue.js的模块和工具\r\n\r\nVue.js提供了一些内置指令、组件和工具，如v-bind、v-for、v-model、Vue Router、Vuex等，使得开发人员可以方便地进行数据绑定、路由管理、状态管理等。同时，Vue.js也提供了大量的第三方插件和工具，如Element UI、Vuetify、Nuxt.js等，使得开发人员可以快速搭建Web应用程序、实现单页应用程序等。\r\n\r\n## 总结\r\n\r\nVue.js是一种非常强大的前端框架，具有响应式、组件化、轻量级、易学易用等特点，适用于Web应用程序开发、移动应用程序开发、单页应用程序开发、插件开发等多个领域。它的出现使得前端开发人员可以更加高效地 构建Web界面，具有很好的推广和应用前景。', 'http://127.0.0.1:8888/image/article/vue.png', '1', 1, 0);
INSERT INTO `article` VALUES (2, 'Node.js：实现全栈JavaScript开发的强大运行时环境', 'Lumina', '2023-12-07', 'Node.js是一种基于Chrome V8 JavaScript引擎的开源、跨平台、事件驱动的JavaScript运行时环境。它可以在服务器端运行JavaScript代码，使得前端开发人员可以使用同样的语言进行后端开发，从而实现全栈JavaScript开发。\r\n\r\n## Node.js的特点\r\n\r\n+   高效性：Node.js采用事件驱动、非阻塞I/O模型，使得它可以处理大量并发请求，具有高效性能。\r\n+   跨平台：Node.js可以在Windows、Linux、Mac OS等多种操作系统上运行，具有很好的跨平台性。\r\n+   模块化：Node.js采用模块化的设计，使得开发人员可以方便地复用代码，提高开发效率。\r\n+   社区活跃：Node.js拥有庞大的社区支持，有大量的第三方模块和工具可供使用。\r\n\r\n## Node.js的应用领域\r\n\r\n1.  Web应用程序开发：Node.js可以作为Web服务器使用，处理HTTP请求和响应，实现Web应用程序的开发。\r\n2.  命令行工具开发：Node.js可以编写命令行工具，实现自动化任务和脚本编写。\r\n3.  实时应用程序开发：Node.js可以处理大量并发请求，适合实时应用程序的开发，如聊天应用程序、在线游戏等。\r\n4.  云计算平台开发：Node.js适合于云计算平台的开发，如PaaS（平台即服务）和IaaS（基础设施即服务）等。\r\n\r\n## Node.js的模块和工具\r\n\r\nNode.js提供了一些内置模块，如HTTP、FS、Path等，使得开发人员可以方便地进行文件操作、网络通信等。同时，Node.js也提供了大量的第三方模块和工具，如Express、Socket.IO、Mongoose等，使得开发人员可以快速搭建Web应用程序、实现实时应用程序等。\r\n\r\n## 总结\r\n\r\nNode.js是一种非常强大的JavaScript运行时环境，具有高效性、跨平台性、模块化等特点，适用于Web应用程序开发、命令行工具开发、实时应用程序开发、云计算平台开发等多个领域。它的出现使得前端开发人员可以在后端使用同样的语言进行开发，实现全栈JavaScript开发，具有很好的推广和应用前景。', 'http://127.0.0.1:8888/image/article/nodejs.jpg', '1', 1, 0);
INSERT INTO `article` VALUES (3, 'React：构建高效、灵活、可维护的用户界面的JavaScript库', 'Lumina', '2023-12-07', 'React是一个由Facebook开发的JavaScript库，用于构建用户界面。它被广泛应用于Web应用程序、移动应用程序和虚拟现实应用程序的开发中。React的设计理念是组件化、声明式编程和可重用性，它可以帮助开发人员构建高效、灵活、可维护的用户界面。\r\n\r\n## React的特点\r\n\r\n+   组件化：React采用了组件化的设计，将页面拆分成多个组件，每个组件可以独立开发、测试和维护。这种设计使得代码更加清晰、可复用性更高。\r\n+   声明式编程：React采用了声明式编程的方式，即开发人员只需要声明要展示的内容，而不需要手动控制DOM元素的变化。这种设计使得开发人员可以更加专注于业务逻辑，而不需要关注底层实现。\r\n+   虚拟DOM：React采用了虚拟DOM的设计，即将页面抽象成一个虚拟的DOM树，当数据发生变化时，React会比较新旧虚拟DOM树的差异，并只更新变化的部分。这种设计使得React可以快速地更新页面，提高了页面渲染的效率。\r\n+   可重用性：React提供了一些内置组件和工具，如React Router、React Redux等，使得开发人员可以方便地进行路由管理、状态管理等。同时，React也提供了大量的第三方组件和工具，如Ant Design、Material UI等，使得开发人员可以快速搭建用户界面。\r\n\r\n## React的应用领域\r\n\r\n1.  Web应用程序开发：React可以帮助开发人员构建高效、灵活、可维护的Web应用程序，如社交媒体应用程序、电商网站等。\r\n2.  移动应用程序开发：React可以使用框架如React Native进行移动应用程序的开发，实现跨平台开发。\r\n3.  单页应用程序开发：React可以帮助开发人员构建单页应用程序，实现流畅的用户体验。\r\n4.  桌面应用程序开发：React可以使用框架如Electron进行桌面应用程序的开发，实现跨平台开发。\r\n\r\n## React的模块和工具\r\n\r\nReact提供了一些内置组件和工具，如React Router、React Redux等，使得开发人员可以方便地进行路由管理、状态管理等。同时，React也提供了大量的第三方组件和工具，如Ant Design、Material UI等，使得开发人员可以快速搭建用户界面。\r\n\r\n## 总结\r\n\r\nReact是一个非常强大的JavaScript库，具有组件化、声明式编程、虚拟DOM、可重用性等特点，适用于Web应用程序开发、移动应用程序开发、单页应用程序开发、桌面应用程序开发等多个领域。它的出现使得前端开发人员可以更加高效地构建用户界面，具有很好的推广和应用前景。', 'http://127.0.0.1:8888/image/article/react.png', '1', 1, 0);
INSERT INTO `article` VALUES (4, 'Angular：构建高效、灵活、可维护的Web应用程序的JavaScript框架', 'Lumina', '2023-12-07', 'Angular是一个由Google开发的JavaScript框架，用于构建Web应用程序。它采用了组件化、模块化、依赖注入等设计理念，可以帮助开发人员构建高效、灵活、可维护的Web应用程序。\r\n\r\n## Angular的特点\r\n\r\n+   组件化：Angular采用了组件化的设计，将页面拆分成多个组件，每个组件可以独立开发、测试和维护。这种设计使得代码更加清晰、可复用性更高。\r\n+   模块化：Angular采用了模块化的设计，将应用程序划分为多个模块，每个模块可以独立开发、测试和维护。这种设计使得应用程序更加易于扩展和维护。\r\n+   依赖注入：Angular采用了依赖注入的设计，将组件之间的依赖关系通过注入的方式进行管理。这种设计使得组件之间的耦合度更低，代码更加可维护。\r\n+   双向数据绑定：Angular采用了双向数据绑定的设计，即当数据发生变化时，视图会自动更新；当视图发生变化时，数据也会自动更新。这种设计使得开发人员可以更加专注于业务逻辑，而不需要手动控制数据与视图的同步。\r\n\r\n## Angular的应用领域\r\n\r\n1.  Web应用程序开发：Angular可以帮助开发人员构建高效、灵活、可维护的Web应用程序，如企业级管理系统、在线教育平台等。\r\n2.  移动应用程序开发：Angular可以使用框架如Ionic进行移动应用程序的开发，实现跨平台开发。\r\n3.  桌面应用程序开发：Angular可以使用框架如Electron进行桌面应用程序的开发，实现跨平台开发。\r\n4.  单页应用程序开发：Angular可以帮助开发人员构建单页应用程序，实现流畅的用户体验。\r\n\r\n## Angular的模块和工具\r\n\r\nAngular提供了一些内置模块，如FormsModule、HttpClientModule等，使得开发人员可以方便地进行表单处理、网络通信等。同时，Angular也提供了大量的第三方模块和工具，如Angular Material、NgRx等，使得开发人员可以快速搭建Web应用程序、实现数据管理等。\r\n\r\n## 总结\r\n\r\nAngular是一个非常强大的JavaScript框架，具有组件化、模块化、依赖注入、双向数据绑定等特点，适用于Web应用程序开发、移动应用程序开发、桌面应用程序开发等多个领域。它的出现使得前端开发人员可以更加高效地构建Web应用程序，具有很好的推广和应用前景。', 'http://127.0.0.1:8888/image/article/angular.jpg', '1', 1, 0);
INSERT INTO `article` VALUES (7, 'jQuery', 'Lumina', '2023-12-20', 'jQuery简介\r\n========\r\n\r\n什么是jQuery？\r\n----------\r\n\r\njQuery是一个快速、简洁且功能丰富的JavaScript库。它是基于JavaScript开发的，旨在简化HTML文档遍历、事件处理、动画效果和AJAX交互等操作。jQuery可以被看作是JavaScript代码的一个抽象层，它大大简化了JavaScript编程的复杂性。\r\n\r\njQuery的特点\r\n---------\r\n\r\n*   简洁：jQuery提供了简洁的API，能够用更少的代码实现更多的功能。\r\n*   跨浏览器兼容性：jQuery已经在不同的浏览器中进行了充分测试，确保在各种浏览器中能够正常运行。\r\n*   多功能：jQuery提供了丰富的功能，包括DOM操作、事件处理、动画效果、AJAX交互等，使得开发人员能够更方便地实现各种需求。\r\n*   插件生态系统：jQuery拥有一个庞大的插件生态系统，开发人员可以利用这些插件来扩展jQuery的功能，提高开发效率。\r\n*   轻量级：jQuery的文件大小相对较小，加载速度快，对网页的性能影响较小。', 'http://127.0.0.1:8888/image/article/202311203161547297.jpg', '1', 1, 0);

-- ----------------------------
-- Table structure for article_category
-- ----------------------------
DROP TABLE IF EXISTS `article_category`;
CREATE TABLE `article_category`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_category
-- ----------------------------
INSERT INTO `article_category` VALUES (1, '编程');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timeStamp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `article_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `uid_fk`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '2023-05-22', '今天学习了Vue.js，发现它非常强大，可以帮助开发人员更高效地构建Web应用程序，感觉自己又进步了一步。', 1, 1);
INSERT INTO `comment` VALUES (2, '2023-05-23', '学习Node.js让我对后端开发有了更深刻的理解和掌握，同时也提升了我的编程能力和实践经验。', 1, 2);
INSERT INTO `comment` VALUES (3, '2023-12-13', '3', 1, 1);
INSERT INTO `comment` VALUES (5, '2023-12-23', '1', 1, 7);

-- ----------------------------
-- Table structure for comment_likes
-- ----------------------------
DROP TABLE IF EXISTS `comment_likes`;
CREATE TABLE `comment_likes`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `comment_id` int(0) NOT NULL,
  `user_id` int(0) NOT NULL,
  `article_id` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `u_fk`(`user_id`) USING BTREE,
  INDEX `a_fk`(`article_id`) USING BTREE,
  INDEX `c_fk`(`comment_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 86 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of comment_likes
-- ----------------------------
INSERT INTO `comment_likes` VALUES (9, 2, 1, 2);
INSERT INTO `comment_likes` VALUES (87, 5, 1, 5);
INSERT INTO `comment_likes` VALUES (85, 1, 1, 1);
INSERT INTO `comment_likes` VALUES (84, 1, 9, 1);

-- ----------------------------
-- Table structure for msgboard
-- ----------------------------
DROP TABLE IF EXISTS `msgboard`;
CREATE TABLE `msgboard`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ctime` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of msgboard
-- ----------------------------
INSERT INTO `msgboard` VALUES (1, '1234', '2023-12-14', 'Lumina');
INSERT INTO `msgboard` VALUES (2, '456', '2023-12-14', 'Lumina');
INSERT INTO `msgboard` VALUES (3, '789', '2023-12-14', 'Lumina');
INSERT INTO `msgboard` VALUES (4, '啊吧啊吧', '2023-12-14', 'Lumina');
INSERT INTO `msgboard` VALUES (6, '测试1\n', '2023-12-14', '洛霖');
INSERT INTO `msgboard` VALUES (7, '测试2\n', '2023-12-14', '洛霖');
INSERT INTO `msgboard` VALUES (8, '测试3\n', '2023-12-14', '洛霖');
INSERT INTO `msgboard` VALUES (11, 'test', '2023-12-14', 'Lumina');
INSERT INTO `msgboard` VALUES (16, '1', '2023-12-19', 'Lumina');
INSERT INTO `msgboard` VALUES (15, '1', '2023-12-14', 'Alice');
INSERT INTO `msgboard` VALUES (17, '123', '2023-12-22', 'Lumina');
INSERT INTO `msgboard` VALUES (18, 'test', '2023-12-23', 'Lumina');
INSERT INTO `msgboard` VALUES (19, 'ceshi', '2023-12-23', 'Lumina');

-- ----------------------------
-- Table structure for swiper
-- ----------------------------
DROP TABLE IF EXISTS `swiper`;
CREATE TABLE `swiper`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of swiper
-- ----------------------------
INSERT INTO `swiper` VALUES (1, 'http://127.0.0.1:8888/image/Home/banner/banner1.png');
INSERT INTO `swiper` VALUES (2, 'http://127.0.0.1:8888/image/Home/banner/202311192224144355.jpg');
INSERT INTO `swiper` VALUES (3, 'http://127.0.0.1:8888/image/Home/banner/banner3.png');
INSERT INTO `swiper` VALUES (5, 'http://127.0.0.1:8888/image/Home/banner/202311192236343.jpg');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ctime` date NULL DEFAULT NULL COMMENT '创建时间',
  `ltime` date NULL DEFAULT NULL COMMENT '上次登陆时间',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'http://127.0.0.1:8888/image/userinfo/defaultAvatar.svg',
  `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '1表示管理员',
  `brief` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  PRIMARY KEY (`id`, `email`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE COMMENT '邮箱',
  UNIQUE INDEX `phone`(`phone`) USING BTREE COMMENT '手机号',
  INDEX `name`(`name`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (1, 'Lumina', 'z1234567', '1710776655@qq.com', '13599558888', '2023-12-09', '2023-12-24', 'http://127.0.0.1:8888/image/userinfo/Lumina/avatar.png', '0', '群星仅是画师的一瞬, 我们也是.');
INSERT INTO `userinfo` VALUES (9, 'Alice', 'z1234567', '1710443322@qq.com', '13599669999', '2023-12-13', '2023-12-24', 'http://127.0.0.1:8888/image/userinfo/upload/202311144213528425.png', '1', '1');

SET FOREIGN_KEY_CHECKS = 1;
