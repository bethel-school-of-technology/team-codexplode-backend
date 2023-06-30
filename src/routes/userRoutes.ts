import { Router } from 'express';
import { createUser, getOneProfile, loginUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:username', getOneProfile);


export default router;