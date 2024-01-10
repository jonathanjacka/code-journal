export const serve = (port: number, filename: string, dir: string) => {
    console.log(`Hi there! Your server is running on port ${port}`);
    console.log(`You're saving and fetching cells from ${filename}`);
    console.log(`This file is located in the following directory ${dir}`);
}