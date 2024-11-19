import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router();

interface User {
    id: number;
    name: string;
    email: string;
}

// Mock data
let users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
];

// GET all users
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
    res.json(users);
});

// GET a single user by ID
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
});

// POST a new user
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
    const { name, email } = req.body;
    const newUser: User = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT to update a user
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    res.json(user);
});

// DELETE a user
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

export default router;
