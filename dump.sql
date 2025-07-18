--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" VALUES ('cmbzejhef00003hwco7orinna', 'Jorge Luis Pacheco', 'sofitech@me.com', NULL, NULL, '$2b$10$5MPs6t4czbgVplqXychXT.WjnZpnlF0ktRKrgGjwpf80wXT50lYJS', 'ADMIN', '2025-06-16 18:02:35.608', '2025-06-16 18:55:28.717');
INSERT INTO public."User" VALUES ('cmc271uy400003h64tfk0agrl', 'Nadine Smart', 'natalleesmart@hotmail.co.uk', NULL, NULL, '$2b$10$OUcZZSuya3IZqzGgj2GVO.hTmHpD4plRM6pwAYYmKg13YtxXlPOZ6', 'ADMIN', '2025-06-18 16:56:14.571', '2025-06-18 17:43:50.549');
INSERT INTO public."User" VALUES ('cmc2codd100013h64jo8arzz4', 'user', 'other@gmail.com', NULL, NULL, '$2b$10$bGtJxaHmo8RwMWA2wYEtre75LWYz.amU0lMfbbJqqGctu8uDMjHie', 'USER', '2025-06-18 19:33:42.949', '2025-06-18 19:33:42.949');
INSERT INTO public."User" VALUES ('cmc41ldem00043h0se5g27xvj', 'otro2', 'oth2er@gmail.com', NULL, NULL, '$2b$10$cl7xf3WIOmT3aSzso9VsaOKIAzxp.o3VnTkfK9lhv.ZNXPSKYV1SK', 'USER', '2025-06-19 23:58:59.614', '2025-06-19 23:58:59.614');


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Address" VALUES ('cmc3nqlyr00013hn0biekuebg', 'cmbzejhef00003hwco7orinna', 'Jorge Luis Pacheco', 'Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A', 'Caraballeda - Estado La Guaira', 'Vargas', '1160', 'United States', '9368715', false, '2025-06-19 17:31:09.363', '2025-06-19 17:31:09.363');
INSERT INTO public."Address" VALUES ('cmc3rspsn000b3hmg4b7oa51i', 'cmc2codd100013h64jo8arzz4', 'Jorge Luis Pacheco', 'Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A', 'Caraballeda - Estado La Guaira', 'Vargas', '1160', 'United States', '9368715', false, '2025-06-19 19:24:46.102', '2025-06-19 19:24:46.102');
INSERT INTO public."Address" VALUES ('cmc41ldem00053h0sluc9spag', 'cmc41ldem00043h0se5g27xvj', 'otro2', '1160', 'Macuto', 'Vargas', '1160', 'Venezuela', '04129368715', true, '2025-06-19 23:58:59.614', '2025-06-19 23:58:59.614');


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Order" VALUES ('cmc3on5a400013hdo9599bkoh', 'cmbzejhef00003hwco7orinna', 81.5, 'DELIVERED', '{"id": "cmc3nqlyr00013hn0biekuebg", "city": "Caraballeda - Estado La Guaira", "phone": "9368715", "state": "Vargas", "street": "Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A", "userId": "cmbzejhef00003hwco7orinna", "country": "United States", "fullName": "Jorge Luis Pacheco", "createdAt": "2025-06-19T17:31:09.363Z", "isDefault": false, "updatedAt": "2025-06-19T17:31:09.363Z", "postalCode": "1160"}', 'pi_3RbmhJFmBhcZyzBr1BbP84FB', '2025-06-19 17:56:27.388', '2025-06-19 19:01:02.897');
INSERT INTO public."Order" VALUES ('cmc3rbk5300013hmgm6puzuhn', 'cmbzejhef00003hwco7orinna', 2, 'COMPLETED', '{"id": "cmc3nqlyr00013hn0biekuebg", "city": "Caraballeda - Estado La Guaira", "phone": "9368715", "state": "Vargas", "street": "Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A", "userId": "cmbzejhef00003hwco7orinna", "country": "United States", "fullName": "Jorge Luis Pacheco", "createdAt": "2025-06-19T17:31:09.363Z", "isDefault": false, "updatedAt": "2025-06-19T17:31:09.363Z", "postalCode": "1160"}', 'pi_3RbnrrFmBhcZyzBr0iSHOuLr', '2025-06-19 19:11:25.623', '2025-06-19 19:11:25.623');
INSERT INTO public."Order" VALUES ('cmc3rj18500053hmgoi241zfh', 'cmbzejhef00003hwco7orinna', 139.48, 'COMPLETED', '{"id": "cmc3nqlyr00013hn0biekuebg", "city": "Caraballeda - Estado La Guaira", "phone": "9368715", "state": "Vargas", "street": "Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A", "userId": "cmbzejhef00003hwco7orinna", "country": "United States", "fullName": "Jorge Luis Pacheco", "createdAt": "2025-06-19T17:31:09.363Z", "isDefault": false, "updatedAt": "2025-06-19T17:31:09.363Z", "postalCode": "1160"}', 'pi_3RbnxUFmBhcZyzBr0vEnugfh', '2025-06-19 19:17:14.357', '2025-06-19 19:17:14.357');
INSERT INTO public."Order" VALUES ('cmc41k3y400013h0sztf2hce6', 'cmbzejhef00003hwco7orinna', 2, 'COMPLETED', '{"id": "cmc3rspsn000b3hmg4b7oa51i", "city": "Caraballeda - Estado La Guaira", "phone": "9368715", "state": "Vargas", "street": "Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A", "userId": "cmc2codd100013h64jo8arzz4", "country": "United States", "fullName": "Jorge Luis Pacheco", "createdAt": "2025-06-19T19:24:46.102Z", "isDefault": false, "updatedAt": "2025-06-19T19:24:46.102Z", "postalCode": "1160"}', 'pi_3RbsLBFmBhcZyzBr0QDJN2Yb', '2025-06-19 23:58:00.7', '2025-06-19 23:58:00.7');
INSERT INTO public."Order" VALUES ('cmc41mag900073h0sx7w3zuk7', 'cmc41ldem00043h0se5g27xvj', 1.5, 'COMPLETED', '{"id": "cmc41ldem00053h0sluc9spag", "city": "Macuto", "phone": "04129368715", "state": "Vargas", "street": "1160", "userId": "cmc41ldem00043h0se5g27xvj", "country": "Venezuela", "fullName": "otro2", "createdAt": "2025-06-19T23:58:59.614Z", "isDefault": true, "updatedAt": "2025-06-19T23:58:59.614Z", "postalCode": "1160"}', 'pi_3RbsMqFmBhcZyzBr1tNJG5fU', '2025-06-19 23:59:42.441', '2025-06-19 23:59:42.441');
INSERT INTO public."Order" VALUES ('cmc4zkh4300013hyshfkr3djn', 'cmbzejhef00003hwco7orinna', 6, 'COMPLETED', '{"id": "cmc3nqlyr00013hn0biekuebg", "city": "Caraballeda - Estado La Guaira", "phone": "9368715", "state": "Vargas", "street": "Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A", "userId": "cmbzejhef00003hwco7orinna", "country": "United States", "fullName": "Jorge Luis Pacheco", "createdAt": "2025-06-19T17:31:09.363Z", "isDefault": false, "updatedAt": "2025-06-19T17:31:09.363Z", "postalCode": "1160"}', 'pi_3Rc7CXFmBhcZyzBr11qGXB81', '2025-06-20 15:50:04.708', '2025-06-20 15:50:04.708');
INSERT INTO public."Order" VALUES ('cmc4zlv7q00053hys5ii3vvnf', 'cmc41ldem00043h0se5g27xvj', 2, 'COMPLETED', '{"id": "cmc3nqlyr00013hn0biekuebg", "city": "Caraballeda - Estado La Guaira", "phone": "9368715", "state": "Vargas", "street": "Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A", "userId": "cmbzejhef00003hwco7orinna", "country": "United States", "fullName": "Jorge Luis Pacheco", "createdAt": "2025-06-19T17:31:09.363Z", "isDefault": false, "updatedAt": "2025-06-19T17:31:09.363Z", "postalCode": "1160"}', 'pi_3Rc7DaFmBhcZyzBr0SQhoCVe', '2025-06-20 15:51:09.638', '2025-06-20 15:51:09.638');
INSERT INTO public."Order" VALUES ('cmc55zha200013hjo9v71y28b', 'cmc41ldem00043h0se5g27xvj', 1.7, 'COMPLETED', '{"id": "cmc3nqlyr00013hn0biekuebg", "city": "Caraballeda - Estado La Guaira", "phone": "9368715", "state": "Vargas", "street": "Av intercomunal de Macuto, edif Cascada janil,piso 2, apto 2-1A", "userId": "cmbzejhef00003hwco7orinna", "country": "United States", "fullName": "Jorge Luis Pacheco", "createdAt": "2025-06-19T17:31:09.363Z", "isDefault": false, "updatedAt": "2025-06-19T17:31:09.363Z", "postalCode": "1160"}', 'pi_3RcA0MFmBhcZyzBr08yIXmaC', '2025-06-20 18:49:42.458', '2025-06-20 18:49:42.458');


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Product" VALUES ('cmc0m1ndu00033hso9nwt3eel', 'Chocolate Digestive', '', 1, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453916/pxbpfs1z5yz44axad78k.webp', 'snacks', '{}', 10, false, NULL, '2025-06-17 14:20:26.657', '2025-06-20 21:12:03.06');
INSERT INTO public."Product" VALUES ('cmc0miinp000d3hso51o8ykwn', 'Bon Bon Bum (24)', '', 10, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453547/wupgbcmwfqxoyekh5guw.webp', 'sweets', '{}', 10, false, NULL, '2025-06-17 14:33:33.684', '2025-06-20 21:05:51.476');
INSERT INTO public."Product" VALUES ('cmc0m8d9s00083hso1prh3noy', 'Bigga Soda', '', 2.2, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453731/zpufbclvwwmlu1acnpgh.webp', 'beverages', '{}', 10, false, NULL, '2025-06-17 14:25:40.144', '2025-06-20 21:08:55.804');
INSERT INTO public."Product" VALUES ('cmc0ndh5h000x3hsokyw5ll6l', 'Snackable (36)', '', 40, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452987/z9yttfnzrofapxqhkblz.jpg', 'wholesale', '{}', 10, false, NULL, '2025-06-17 14:57:38.068', '2025-06-20 20:56:31.226');
INSERT INTO public."Product" VALUES ('cmc0lzidn00013hso1tpeqr2v', 'Snackables', '', 1.5, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453970/g6zungorlyydbhhyqudi.webp', 'snacks', '{}', 10, false, NULL, '2025-06-17 14:18:46.858', '2025-06-20 21:12:54.946');
INSERT INTO public."Product" VALUES ('cmc0nhvxg00103hsob82e8i01', 'Caro Gel', '', 2.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452904/if0hsc4tl6cgy0vrgix6.webp', 'health-beauty', '{}', 10, false, NULL, '2025-06-17 15:01:03.832', '2025-06-20 20:55:08.922');
INSERT INTO public."Product" VALUES ('cmc0ngjx2000z3hsohaga818b', 'Carbolic Soap', '', 1.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452930/nssyzsxgnvjwoykzymwy.jpg', 'health-beauty', '{}', 10, false, NULL, '2025-06-17 15:00:01.622', '2025-06-20 20:55:33.945');
INSERT INTO public."Product" VALUES ('cmc0ne7bk000y3hsod2t0w56z', 'GRACE VIENNA CASE (48)', '', 130, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452959/yuvahceand8nyszd5uyd.jpg', 'wholesale', '{}', 9, false, NULL, '2025-06-17 14:58:11.983', '2025-06-20 20:56:04.291');
INSERT INTO public."Product" VALUES ('cmc0nbc4y000v3hsoxn7jjigo', 'Cran Wata (24)', '', 35, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453032/t9uwrcycwoczvatqawfk.jpg', 'wholesale', '{}', 10, false, NULL, '2025-06-17 14:55:58.245', '2025-06-20 20:57:19.512');
INSERT INTO public."Product" VALUES ('cmc0na5lq000u3hsoec0mabs8', 'Magnum case (24)', '', 120, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453061/efl06zkqasywwyropmaw.jpg', 'wholesale', '{}', 10, false, NULL, '2025-06-17 14:55:03.133', '2025-06-20 20:57:46.005');
INSERT INTO public."Product" VALUES ('cmc0n8f6f000t3hso7tn6iq4e', 'Chubby Drink', '', 15, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453087/hbzzif0wy981n5ael4ek.webp', 'wholesale', '{}', 10, false, NULL, '2025-06-17 14:53:42.23', '2025-06-20 20:58:11.743');
INSERT INTO public."Product" VALUES ('cmc0n6e8j000s3hsoac5zdq8g', 'Tastee Cheese', '', 22, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453112/hpq5gnhxxz2gbwv4oz32.webp', 'grocery', '{}', 10, false, NULL, '2025-06-17 14:52:07.698', '2025-06-20 20:58:36.733');
INSERT INTO public."Product" VALUES ('cmc0n3uyn000r3hsojudz2z51', 'Bar Snacks', '', 2.1, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453132/segeyqllnleznt77dpsp.avif', 'grocery', '{}', 10, false, NULL, '2025-06-17 14:50:09.394', '2025-06-20 20:58:57.525');
INSERT INTO public."Product" VALUES ('cmc0myi6q000q3hsog9zyvh0i', 'Grace Vienna Sausage', '', 4, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453164/kavclxjcfp2d8h0jjv7l.avif', 'grocery', '{}', 10, false, NULL, '2025-06-17 14:45:59.57', '2025-06-20 20:59:30.862');
INSERT INTO public."Product" VALUES ('cmc0mw01q000p3hsobtdqp9wd', 'Lasco', '', 2.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453195/kdrgiiklzl5sjdj8k1yc.webp', 'grocery', '{}', 10, false, NULL, '2025-06-17 14:44:02.749', '2025-06-20 21:00:00.362');
INSERT INTO public."Product" VALUES ('cmc0mvb01000o3hsom8e80yzi', 'Red & White corn flakes', '', 6, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453223/p9wk0syvrjlhjw4fj6ep.webp', 'grocery', '{}', 10, false, NULL, '2025-06-17 14:43:30.289', '2025-06-20 21:00:29.16');
INSERT INTO public."Product" VALUES ('cmc0mu9k5000n3hso6q2gwibt', 'Grace Vienna sausage (spicy)', '', 4.5, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453258/xrcbuz6iwx5wp4mscdr1.webp', 'grocery', '{}', 10, false, NULL, '2025-06-17 14:42:41.764', '2025-06-20 21:01:02.676');
INSERT INTO public."Product" VALUES ('cmc0msvzl000m3hsodkna9fum', 'Dominoes', '', 9.8, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453305/ivoefmxehyu4ne5hoxjr.jpg', 'household', '{}', 10, false, NULL, '2025-06-17 14:41:37.511', '2025-06-20 21:01:49.302');
INSERT INTO public."Product" VALUES ('cmc0mr4eq000k3hsolshlrvfx', 'Grater small', '', 3, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453364/n1dao1y7gwockinqauch.webp', 'household', '{}', 10, false, NULL, '2025-06-17 14:40:15.121', '2025-06-20 21:02:48.14');
INSERT INTO public."Product" VALUES ('cmc0mqgre000j3hsov9jhd0a0', ' Dutch Pot Dutch Pot', '', 43, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453385/tevv0tdlamgyejslarsg.jpg', 'household', '{}', 10, false, NULL, '2025-06-17 14:39:44.473', '2025-06-20 21:03:09.647');
INSERT INTO public."Product" VALUES ('cmc0mpnr8000i3hso9l9inq1y', 'Cake Soap (3pk)', '', 3.3, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453424/rxqsbsyxw5oqdt1wgqlu.webp', 'household', '{}', 10, false, NULL, '2025-06-17 14:39:06.884', '2025-06-20 21:03:48.581');
INSERT INTO public."Product" VALUES ('cmc0mow2u000h3hsonjpzsgs5', 'Essential', '', 1.5, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453445/wg9agwa8w70wbfzmmsfd.avif', 'household', '{}', 10, false, NULL, '2025-06-17 14:38:31.014', '2025-06-20 21:04:09.693');
INSERT INTO public."Product" VALUES ('cmc0mn9t9000g3hso2li0fuax', 'Busta', '', 2, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453479/q0w2wesjyw1b4tbjxo79.webp', 'sweets', '{}', 10, false, NULL, '2025-06-17 14:37:15.5', '2025-06-20 21:04:44.17');
INSERT INTO public."Product" VALUES ('cmc0mltpq000f3hsom74oyc4c', 'Bon Bon bum passion fruit', '', 10, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453504/xhlwddatbr8qs9i4dpik.jpg', 'sweets', '{}', 10, false, NULL, '2025-06-17 14:36:07.97', '2025-06-20 21:05:08.942');
INSERT INTO public."Product" VALUES ('cmc0mk13i000e3hsog81qxwyg', 'Bon Bon bum junior', '', 10, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453522/w4vsg17kngszxutiwigw.webp', 'sweets', '{}', 10, false, NULL, '2025-06-17 14:34:44.238', '2025-06-20 21:05:26.191');
INSERT INTO public."Product" VALUES ('cmc0mhpau000c3hsoxdab2lxi', 'Bobbie', '', 15, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453577/jiuzc2cvpf95fwzfjxdb.webp', 'sweets', '{}', 10, false, NULL, '2025-06-17 14:32:55.637', '2025-06-20 21:06:23.199');
INSERT INTO public."Product" VALUES ('cmc0meqea000b3hso9myxk58f', 'Black Cherry (240)', '', 20, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453600/kihj3x7ayv35deyu7nh6.jpg', 'sweets', '{}', 10, false, NULL, '2025-06-17 14:30:37.078', '2025-06-20 21:06:44.196');
INSERT INTO public."Product" VALUES ('cmc0mcn1j000a3hsox0e0syqz', 'Boom Energy Drink', '', 2.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453671/g9jqjqzguklh0tq12ttz.webp', 'beverages', '{}', 10, false, NULL, '2025-06-17 14:28:59.43', '2025-06-20 21:07:57.161');
INSERT INTO public."Product" VALUES ('cmc0ma7f900093hsohtjgya93', 'Black Stallion Herbal Tonic', '', 10, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453699/thmrjdkb67u9b3pyrbdk.webp', 'beverages', '{}', 9, false, NULL, '2025-06-17 14:27:05.877', '2025-06-20 21:08:27.929');
INSERT INTO public."Product" VALUES ('cmc0m64fr00063hsoph667dbd', 'Apple J', '', 2.1, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453793/goalrvreoogcxchx1jfp.webp', 'beverages', '{}', 3, false, NULL, '2025-06-17 14:23:55.382', '2025-06-20 21:09:59.215');
INSERT INTO public."Product" VALUES ('cmc0m347f00043hsot3k3qxns', 'Spice Bun', '', 2, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453865/ukpsoidphtnxde0grq6p.webp', 'snacks', '{}', 7, false, NULL, '2025-06-17 14:21:35.114', '2025-06-20 21:11:09.088');
INSERT INTO public."Product" VALUES ('cmc0m0w4x00023hsoi4ohprn5', 'Parrot Biscuits', '', 1.7, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453944/uixarvv4zbina9sblfrw.webp', 'snacks', '{}', 9, false, NULL, '2025-06-17 14:19:51.332', '2025-06-20 21:12:32.449');
INSERT INTO public."Product" VALUES ('cmc0lwcoz00003hsocbx178mt', 'Tigaz', '', 1.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750454013/lldsh7cfpvm0esxzeqzf.webp', 'snacks', '{}', 10, false, NULL, '2025-06-17 14:16:19.521', '2025-06-20 21:13:37.988');
INSERT INTO public."Product" VALUES ('cmbzj3n6600003h6s56j6gzc5', 'Big Foot', 'chucherias', 1.8, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750454047/r8mzvuqt9101qjjyyhhu.webp', 'SNACKS', '{}', 8, false, NULL, '2025-06-16 20:10:14.668', '2025-06-20 21:14:14.626');
INSERT INTO public."Product" VALUES ('cmc0np1jv00173hsoi3erq61k', 'Snackables', '', 1.5, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452656/xhmazp530rxxlfs7bj5t.webp', 'dollar-menu', '{}', 10, false, NULL, '2025-06-17 15:06:37.708', '2025-06-20 20:51:01.439');
INSERT INTO public."Product" VALUES ('cmc0no01g00163hsoxm4mb696', 'Tigaz', '', 1.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452726/eljr82kmvthnibpuk9ra.webp', 'dollar-menu', '{}', 10, false, NULL, '2025-06-17 15:05:49.108', '2025-06-20 20:52:11.14');
INSERT INTO public."Product" VALUES ('cmc0nmy1s00153hsour6gaonw', 'Big Foot', '', 1.8, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452753/lz7sf0k501h8j8fx4p8v.webp', 'dollar-menu', '{}', 10, false, NULL, '2025-06-17 15:04:59.871', '2025-06-20 20:52:39.531');
INSERT INTO public."Product" VALUES ('cmc0nl5kb00143hsogfo2cdqj', 'New light gel', '', 5, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452795/pkacnr0zgelwekpqihjd.webp', 'health-beauty', '{}', 10, false, NULL, '2025-06-17 15:03:36.298', '2025-06-20 20:53:19.772');
INSERT INTO public."Product" VALUES ('cmc0nkhoe00133hsoevcalmw5', 'Neoprosone C lighting gel', '', 2.5, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452833/tzhqcg65un4joys6kfo1.webp', 'health-beauty', '{}', 10, false, NULL, '2025-06-17 15:03:05.341', '2025-06-20 20:53:58.159');
INSERT INTO public."Product" VALUES ('cmc0nj73800123hsoiztstbs3', 'GG gel', '', 2.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452853/dt3es9v0kqzxbeluuzid.webp', 'health-beauty', '{}', 10, false, NULL, '2025-06-17 15:02:04.963', '2025-06-20 20:54:17.139');
INSERT INTO public."Product" VALUES ('cmc0niiz100113hsoa4ic0ykw', 'F&W Gel', '', 2.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750452882/kgcu6md9ql7niz1tokvc.webp', 'health-beauty', '{}', 10, false, NULL, '2025-06-17 15:01:33.708', '2025-06-20 20:54:46.315');
INSERT INTO public."Product" VALUES ('cmc0ncdms000w3hsoukthrt05', 'BIG FOOT (96)', '', 70, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453009/v9dzjlqtg2ivwbkywlck.webp', 'wholesale', '{}', 9, false, NULL, '2025-06-17 14:56:46.851', '2025-06-20 20:56:52.235');
INSERT INTO public."Product" VALUES ('cmc0ms2ev000l3hsop8quccfg', ' Ludo Board Ludo Board', '', 55, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453331/wjkwlycr2ke5ki8adgae.webp', 'household', '{}', 10, false, NULL, '2025-06-17 14:40:59.191', '2025-06-20 21:02:17.628');
INSERT INTO public."Product" VALUES ('cmc0m7cr100073hsoh1bcemet', 'Big Bamboo Irish Moss', '', 3, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453767/lk98oprg0wk3ha1gjisx.webp', 'beverages', '{}', 10, false, NULL, '2025-06-17 14:24:52.8', '2025-06-20 21:09:32.16');
INSERT INTO public."Product" VALUES ('cmc0m4ly700053hsonbqcwfme', 'Angostura Chill', '', 3.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750453817/ofy9kzf3q70o6u3aobpb.webp', 'beverages', '{}', 10, false, NULL, '2025-06-17 14:22:44.765', '2025-06-20 21:10:25.936');
INSERT INTO public."Product" VALUES ('cmc5gw8bv00003hdogjdiey98', 'Badia Cinnamon Powder/ Canela en Polvo- 4 oz', 'dd', 2.99, '', 'grocery', '{}', 10, false, NULL, '2025-06-20 23:55:06.666', '2025-06-20 23:55:06.666');
INSERT INTO public."Product" VALUES ('cmc496fao00003hzg7i2xijbv', 'Campari', 'ddd', 15, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750395813/hqepiezaacvuvuztszzd.webp', 'beverages', '{}', 10, false, NULL, '2025-06-20 03:31:19.151', '2025-06-20 05:03:40.5');
INSERT INTO public."Product" VALUES ('cmc2csb9b00023h64sig3ee0d', 'Duplex', 'xxx', 1.5, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750396420/a2bxdix91ppun3bvbd4l.webp', 'snacks', '{}', 7, false, NULL, '2025-06-18 19:36:46.846', '2025-06-20 05:13:48.289');
INSERT INTO public."Product" VALUES ('cmc53wnht00003h60wqfymgyv', 'Badia Anise Seed ΓÇô 1.75 oz', 'xxxx', 1.99, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750441884/n7eoclh2z6rr9nzuhgaf.webp', 'grocery', '{}', 10, false, NULL, '2025-06-20 17:51:31.311', '2025-06-20 17:51:31.311');
INSERT INTO public."Product" VALUES ('cmc59ocbw00003hescbiffksw', 'Badia Complete Seasoning / Saz├│n Completa - (12oz) 340.2g', 'safdfdsf', 2, 'https://res.cloudinary.com/dljqzuikg/image/upload/v1750451566/n05ouenexb1rrgam4yms.jpg', 'grocery', '{}', 10, false, NULL, '2025-06-20 20:33:01.291', '2025-06-20 20:33:01.291');


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."OrderItem" VALUES ('cmc3on5a400033hdol3jmwx0z', 'cmc3on5a400013hdo9599bkoh', 'cmc2csb9b00023h64sig3ee0d', 1, 1.5);
INSERT INTO public."OrderItem" VALUES ('cmc3on5a400043hdowxdzhhq6', 'cmc3on5a400013hdo9599bkoh', 'cmc0ma7f900093hsohtjgya93', 1, 10);
INSERT INTO public."OrderItem" VALUES ('cmc3on5a400053hdo96e4gru3', 'cmc3on5a400013hdo9599bkoh', 'cmc0ncdms000w3hsoukthrt05', 1, 70);
INSERT INTO public."OrderItem" VALUES ('cmc3rbk5300033hmg3dsa5dvd', 'cmc3rbk5300013hmgm6puzuhn', 'cmc0m347f00043hsot3k3qxns', 1, 2);
INSERT INTO public."OrderItem" VALUES ('cmc3rj18500073hmgx42czr4c', 'cmc3rj18500053hmgoi241zfh', 'cmc2csb9b00023h64sig3ee0d', 1, 1.5);
INSERT INTO public."OrderItem" VALUES ('cmc3rj18500083hmgsfvm7kmk', 'cmc3rj18500053hmgoi241zfh', 'cmc0m4ly700053hsonbqcwfme', 2, 3.99);
INSERT INTO public."OrderItem" VALUES ('cmc3rj18500093hmgien3b89l', 'cmc3rj18500053hmgoi241zfh', 'cmc0ne7bk000y3hsod2t0w56z', 1, 130);
INSERT INTO public."OrderItem" VALUES ('cmc41k3y400033h0sflo7t14f', 'cmc41k3y400013h0sztf2hce6', 'cmc0m347f00043hsot3k3qxns', 1, 2);
INSERT INTO public."OrderItem" VALUES ('cmc41mag900093h0s36m9expi', 'cmc41mag900073h0sx7w3zuk7', 'cmc2csb9b00023h64sig3ee0d', 1, 1.5);
INSERT INTO public."OrderItem" VALUES ('cmc4zkh4300033hysovw2mgd7', 'cmc4zkh4300013hyshfkr3djn', 'cmbzj3n6600003h6s56j6gzc5', 2, 1.8);
INSERT INTO public."OrderItem" VALUES ('cmc4zlv7q00073hyspnkj1nrq', 'cmc4zlv7q00053hys5ii3vvnf', 'cmc0m347f00043hsot3k3qxns', 1, 2);
INSERT INTO public."OrderItem" VALUES ('cmc55zha200033hjobkcsayzk', 'cmc55zha200013hjo9v71y28b', 'cmc0m0w4x00023hsoi4ohprn5', 1, 1.7);


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('910c9b4c-f7bd-4c2e-8a81-eaf71095b64c', 'ff769afde6c6a4c87249ea2fbc4992ad28c984c38bdd59b5847e5d7c30cee100', '2025-06-16 17:17:30.240542+00', '20250616171729_initial_setup', NULL, NULL, '2025-06-16 17:17:30.130117+00', 1);
INSERT INTO public._prisma_migrations VALUES ('7e630b08-4989-4aa3-8cbc-22cba75055cd', 'a2104e706c3e57975048a20bba2e3a1d521fd8aeee05f9551d22faba391039b2', '2025-06-19 16:45:12.113571+00', '20250619164512_add_address_model', NULL, NULL, '2025-06-19 16:45:12.059658+00', 1);
INSERT INTO public._prisma_migrations VALUES ('96cc52a2-178f-4ce0-8e48-dd62d70d9893', '7804477cf018c7a8a4d592e4b1c08b2dac287edec16fbc7be1e2065b0df8ffcf', '2025-06-19 18:23:04.731581+00', '20250619182304_update_order_status', NULL, NULL, '2025-06-19 18:23:04.720527+00', 1);


--
-- PostgreSQL database dump complete
--

