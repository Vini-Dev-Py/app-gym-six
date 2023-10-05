export const getUser = async () => {
    try {
        const user = localStorage.getItem("app-gym-six-user");

        return user;
    } catch (error) {
        
    }
}