import { IUser } from "./types/Users";

const baseUrl = "http://localhost:8000";

export const getAllUsers = async (): Promise<IUser[]> => {
    const res = await fetch(`${baseUrl}/users`, { cache: 'no-store' });
    const users = await res.json();
    return users;
}

export const getUserById = async (id: string): Promise<IUser> => {
    const res = await fetch(`${baseUrl}/users/${id}`, {
        method: 'GET',
    });
    const user = await res.json();
    return user;
}


export const addNewUser = async (user: IUser): Promise<IUser> => {
    const res = await fetch(`${baseUrl}/users`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const newUser = await res.json();
    return newUser;
}


export const EditUser = async (user: IUser): Promise<IUser> => {
    const res = await fetch(`${baseUrl}/users/${user.id}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const updatedUser = await res.json();
    return updatedUser;
}
export const DeleteUser = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/users/${id}`, {
    method: 'DELETE',
    })
}