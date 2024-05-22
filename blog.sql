/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80200 (8.2.0)
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80200 (8.2.0)
 File Encoding         : 65001

 Date: 22/05/2024 17:12:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` bigint NOT NULL COMMENT '主键',
  `title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标题',
  `title_eng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '英文标题',
  `classes` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '分类',
  `url` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '链接',
  `tags` json DEFAULT NULL COMMENT '标签JSON数组',
  `post` bit(1) DEFAULT b'0' COMMENT '发布状态。true：已发布，false：草稿',
  `posted_at` datetime DEFAULT NULL COMMENT '发布时间',
  `summary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '概要',
  `state` bit(1) DEFAULT b'1' COMMENT '状态',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `created_by` bigint DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '修改时间',
  `updated_by` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505157861228613, '理解 useRef 和 forwardRef 的用法', 'React-Hooks-useRef-forwardRef', '技术杂烩', 'https://kangod.top/blog/React-Hooks-useRef-forwardRef', '[\"React\", \"Hooks\"]', b'1', '2023-11-28 18:12:19', '我之前一直没理解清楚什么时候应该使用 React 的 useRef hooks，它感觉与 useState 比较像，但后来发现这两者其实都有自己最适合使用的场景。', b'1', NULL, '2023-11-28 18:12:35.975789', NULL, '2023-12-07 15:53:13.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505431770206277, '分块数组 - JavaScript 算法', 'chunked-array-JavaScript-algorithm', '学习笔记', 'https://kangod.top/blog/chunked-array-JavaScript-algorithm', '[\"JavaScript\", \"算法\", \"分块数组\"]', b'1', '2023-11-29 12:46:23', '一个完整的数组，使用 JS 原生代码，返回给定大小的数据块。', b'1', NULL, '2023-11-29 12:47:09.811950', NULL, '2023-12-15 14:28:04.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505722365132869, 'JavaScript 中的空合并运算符', 'nullish-coalescing-vs-logicall-OR', '学习笔记', 'https://kangod.top/blog/nullish-coalescing-vs-logicall-OR', '[\"JavaScript\", \"React\"]', b'1', '2023-11-30 08:29:13', '我在写一些代码时，发现了空值合并运算符（??）的一些有趣用法。我之前经常使用逻辑 OR (||) 运算符来检查 null 或未定义的值，某些情况下空值合并运算符（??）或许是更好的替代方案。', b'1', NULL, '2023-11-30 08:29:34.313580', NULL, '2023-12-15 14:26:59.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (506792175554629, '在 CSS 中居中对齐的一些方法', 'some-ways-to-center-align-in-CSS', '学习笔记', 'https://kangod.top/blog/some-ways-to-center-align-in-CSS', '[\"CSS\", \"HTML\"]', b'1', '2023-12-03 09:02:14', '居中对齐 div 的一些方法总结', b'1', NULL, '2023-12-03 09:02:38.502337', NULL, '2023-12-15 14:27:43.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (507183315628101, 'VS Code 扩展插件：REST Client', 'VS-Code-extend-REST-Client', '日常使用', 'https://kangod.top/blog/VS-Code-extend-REST-Client', '[\"VS Code\", \"扩展插件\"]', b'1', '2023-12-04 11:32:48', '代替 Postman 的 VS Code 扩展插件，简单易用、无需登录、本地保存，在编辑器内部使用，无需切换到其他的界面', b'1', NULL, '2023-12-04 11:34:11.691177', NULL, '2024-02-01 20:55:37.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (507621065674821, '「编译型语言」和「解释型语言」的区别', 'The-difference-between-compiled-and-interpreted-languages', '学习笔记', 'https://kangod.top/blog/The-difference-between-compiled-and-interpreted-languages', '[\"JavaScript\", \"Java\"]', b'1', '2023-12-05 17:15:16', '根据处理方式，编程语言可以大致分为两种类型：编译型和解释型。了解两者之间的区别可以帮助我们的项目选择正确的编程语言，还可以用来优化代码以获得更好的性能。', b'1', NULL, '2023-12-05 17:15:24.253325', NULL, '2023-12-15 14:26:10.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (508234047365189, 'NestJS 实现参数装饰器的类型安全', 'NestJS-tip-type-safety-on-parameter-decorators', '技术杂烩', 'https://kangod.top/blog/NestJS-tip-type-safety-on-parameter-decorators', '[\"NestJS\", \"TypeScript\"]', b'1', '2023-12-07 10:48:51', 'TypeScript 在 NestJS中 使用声明合并的应用，可以在 controller 类定义可读性更好、更方便维护的期望类型', b'1', NULL, '2023-12-07 10:49:38.012789', NULL, '2023-12-14 13:59:18.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (509593225068613, '修补 npm 包已知 bug 的简单办法', 'the-easiest-way-to-patch-npm-package-bug', '技术杂烩', 'https://kangod.top/blog/the-easiest-way-to-patch-npm-package-bug', '[\"JavaScript\", \"npm\"]', b'1', '2023-12-11 06:56:28', '遇到某个 npm 包里面的代码有bug，或者不满足现有需求的时候，一个处理 npm 包的简单办法', b'1', NULL, '2023-12-11 07:00:08.509176', NULL, '2023-12-11 08:13:29.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (510723568783429, 'NestJS 定义和平台无关的响应状态/标头方法', 'nestjs-tip-platform-agnostic-way-to-define-response-status-headers', '技术杂烩', 'https://kangod.top/blog/nestjs-tip-platform-agnostic-way-to-define-response-status-headers', '[\"NestJS\", \"Node.js\"]', b'1', '2023-12-14 11:06:22', '比官方定义 library-specific 模式，实现动态更改默认状态码/标头更好的方法，做到真正的 platform agnosticism', b'1', NULL, '2023-12-14 11:39:31.301317', NULL, '2023-12-14 14:05:38.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (517883277840453, '使用 CSS 实现炫酷的摆动悬停动画', 'cool-wiggly-hover-animation-with-css', '学习笔记', 'https://kangod.top/blog/cool-wiggly-hover-animation-with-css', '[\"CSS\", \"HTML\"]', b'1', '2024-01-03 17:11:53', '我最近在 byline 上看到了一个很酷的摆动悬停动画，发现它很有意思，去研究了一下它的具体实现', b'1', NULL, '2024-01-03 17:12:27.158194', NULL, '2024-01-24 17:34:35.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (520456898551877, 'Dell Inspiron 7590 安装黑苹果 macOS Ventura 13.4', 'Laptop-Dual-System-Hackintosh-on-a-Windows-computer', '日常使用', 'https://kangod.top/blog/Laptop-Dual-System-Hackintosh-on-a-Windows-computer', '[\"黑苹果\", \"macOS\"]', b'1', '2024-01-10 23:42:18', '通过两块硬盘隔离系统环境，一个是原本在使用的 Windows 系统，一个是新硬盘加装的 Hackintosh（黑苹果）', b'1', NULL, '2024-01-10 23:44:32.672810', NULL, '2024-02-01 20:55:53.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (525292823699525, '在 CSS 中使用透明渐变效果去淡化内容', 'fading-content-using-transparent-gradients-in-css', '学习笔记', 'https://kangod.top/blog/fading-content-using-transparent-gradients-in-css', '[\"CSS\", \"HTML\"]', b'1', '2024-01-24 15:06:58', '我查看了 trunk.io 网站，最近我老是喜欢在优秀的网站上看到一些别样的 CSS，并剖析学习，相信以后有能用得上的地方', b'1', NULL, '2024-01-24 15:41:58.322611', NULL, '2024-01-24 17:29:46.000000', NULL);
INSERT INTO `article` (`id`, `title`, `title_eng`, `classes`, `url`, `tags`, `post`, `posted_at`, `summary`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (528157295345733, '定制 Mac 终端的舒适体验', 'setting-up-mac-terminal', '日常使用', 'https://kangod.top/blog/setting-up-mac-terminal', '[\"Terminal\", \"Oh-My-Zsh\", \"iTerm2\"]', b'1', '2024-02-01 17:14:03', '为 Web 开发设置 Mac 终端的小指南 - 推荐的插件、主题、字体等', b'1', NULL, '2024-02-01 17:57:32.207579', NULL, '2024-02-01 21:46:42.000000', NULL);
COMMIT;

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` bigint NOT NULL COMMENT '主键',
  `content` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '内容',
  `state` bit(1) DEFAULT b'1' COMMENT '状态',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `created_by` bigint DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '修改时间',
  `updated_by` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of classes
-- ----------------------------
BEGIN;
INSERT INTO `classes` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505157714706501, '技术杂烩', b'1', NULL, '2023-11-28 18:12:00.208140', NULL, '2023-12-14 20:45:09.000000', NULL);
INSERT INTO `classes` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (510857731870789, '心情随写', b'1', NULL, '2023-12-14 20:45:25.963030', NULL, '2023-12-14 20:45:25.963030', NULL);
INSERT INTO `classes` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (510857754333253, '学习笔记', b'1', NULL, '2023-12-14 20:45:31.436532', NULL, '2023-12-14 20:45:31.436532', NULL);
INSERT INTO `classes` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (528201006268485, '日常使用', b'1', NULL, '2024-02-01 20:55:23.800962', NULL, '2024-02-01 20:55:23.800962', NULL);
COMMIT;

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` bigint NOT NULL COMMENT '主键',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '内容',
  `state` bit(1) DEFAULT NULL COMMENT '状态',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `created_by` bigint DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '修改时间',
  `updated_by` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of notice
-- ----------------------------
BEGIN;
INSERT INTO `notice` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (1, '欢迎来到 Kangod\'s Blog 后台管理系统', b'1', NULL, '2023-11-30 18:57:03.376889', NULL, '2023-12-12 19:18:05.111631', NULL);
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` bigint NOT NULL COMMENT '主键',
  `title` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标题',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '描述',
  `href` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '链接',
  `img_src` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '图片源',
  `tech_stack` json DEFAULT NULL COMMENT '技术栈',
  `sort_value` int DEFAULT '1' COMMENT '排序值',
  `state` bit(1) DEFAULT b'1' COMMENT '状态',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `created_by` bigint DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '修改时间',
  `updated_by` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of project
-- ----------------------------
BEGIN;
INSERT INTO `project` (`id`, `title`, `description`, `href`, `img_src`, `tech_stack`, `sort_value`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (509663286894661, 'blog admin 后台网站', '使用 React 构建的 Blog 后台管理项目', 'https://admin.kangod.top', 'https://raw.githubusercontent.com/KangodYan/blog-admin/master/public/assets/blog-admin-ex.png', '[\"React\", \"TypeScript\", \"Vite\", \"MySQL\", \"TypeORM\", \"TanStackQuery\", \"ArcoDesign\", \"Redux\", \"NestJS\"]', 1, b'1', NULL, '2023-12-11 11:45:13.414066', NULL, '2024-05-21 17:22:45.000000', NULL);
INSERT INTO `project` (`id`, `title`, `description`, `href`, `img_src`, `tech_stack`, `sort_value`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (509663943692357, 'prune admin 后台网站', '使用 React 构建的快速开发平台 Admin 后台项目', 'https://prune.kangod.top', 'https://raw.githubusercontent.com/KangodYan/prune-admin/main/src/assets/home.png', '[\"React\", \"TypeScript\", \"Vite\", \"TailwindCSS\", \"MySQL\", \"TypeORM\", \"TanStackQuery\", \"AntDesign\", \"NestJS\", \"Zustand\"]', 2, b'1', NULL, '2023-12-11 11:47:53.762224', NULL, '2024-05-21 18:43:42.000000', NULL);
COMMIT;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` bigint NOT NULL COMMENT '主键',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '内容',
  `state` bit(1) DEFAULT NULL COMMENT '状态',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `created_by` bigint DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '修改时间',
  `updated_by` bigint DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of tag
-- ----------------------------
BEGIN;
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505159244296261, 'React', b'1', NULL, '2023-11-28 18:18:13.634506', NULL, '2023-11-29 08:36:26.672196', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505159253475397, 'Hooks', b'1', NULL, '2023-11-28 18:18:15.874034', NULL, '2023-11-28 18:18:15.874034', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505431575588933, 'WebSocket', b'1', NULL, '2023-11-29 12:46:22.087801', NULL, '2023-11-29 12:46:22.087801', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505721966768197, 'JavaScript', b'1', NULL, '2023-11-30 08:27:57.062406', NULL, '2023-11-30 08:27:57.062406', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505722781491269, '算法', b'1', NULL, '2023-11-30 08:31:15.957025', NULL, '2023-11-30 08:31:15.957025', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (505722798358597, '分块数组', b'1', NULL, '2023-11-30 08:31:20.073774', NULL, '2023-11-30 08:31:20.073774', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (506792066027589, 'CSS', b'1', NULL, '2023-12-03 09:02:11.774849', NULL, '2023-12-03 09:02:11.774849', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (506797463199813, 'HTML', b'1', NULL, '2023-12-03 09:24:09.421192', NULL, '2023-12-03 09:24:09.421192', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (506798892523589, 'TypeScript', b'1', NULL, '2023-12-03 09:29:58.378473', NULL, '2023-12-03 09:29:58.378473', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (507182826180677, 'VS Code', b'1', NULL, '2023-12-04 11:32:12.228032', NULL, '2023-12-04 11:32:12.228032', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (507182888120389, '扩展插件', b'1', NULL, '2023-12-04 11:32:27.301663', NULL, '2023-12-04 15:55:52.787128', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (507621603229765, 'Java', b'1', NULL, '2023-12-05 17:17:35.486576', NULL, '2023-12-05 17:17:35.486576', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (508236397793349, 'NestJS', b'1', NULL, '2023-12-07 10:59:11.816308', NULL, '2023-12-07 10:59:11.816308', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (509591130075205, 'npm', b'1', NULL, '2023-12-11 06:51:37.023859', NULL, '2023-12-11 06:51:37.023859', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (510716066615365, 'Node.js', b'1', NULL, '2023-12-14 11:08:59.711649', NULL, '2023-12-14 11:08:59.711649', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (520457001713733, '黑苹果', b'1', NULL, '2024-01-10 23:44:57.689119', NULL, '2024-01-10 23:44:57.689119', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (520457091514437, 'macOS', b'1', NULL, '2024-01-10 23:45:19.613624', NULL, '2024-01-10 23:45:19.613624', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (528145881559109, 'Terminal', b'1', NULL, '2024-02-01 17:11:05.628755', NULL, '2024-02-01 17:11:05.628755', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (528146257326149, 'Oh-My-Zsh', b'1', NULL, '2024-02-01 17:12:37.359653', NULL, '2024-02-01 17:12:56.000000', NULL);
INSERT INTO `tag` (`id`, `content`, `state`, `deleted_at`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES (528146566885445, 'iTerm2', b'1', NULL, '2024-02-01 17:13:52.935662', NULL, '2024-02-01 17:13:52.935662', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
