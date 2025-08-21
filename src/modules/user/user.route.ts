import { Router } from "express";
import { UserController } from "./user.controller";
import { CreateUserDto, LoginUserDto } from "./dto";
import { validateDto } from "../../middlewares/validate";
import { auth } from "../../middlewares";

const router = Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully
 *               user:
 *                 id: "64f9c7b2a6d8c1"
 *                 name: "John Doe"
 *                 email: "john@example.com"
 */
router.post("/register", validateDto(CreateUserDto), UserController.register);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: Login successful
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.post("/login", validateDto(LoginUserDto), UserController.login);

/**
 * @openapi
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []   # 🔑 token talab qilinadi
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
router.get("/all", auth, UserController.getAll);

export default router;