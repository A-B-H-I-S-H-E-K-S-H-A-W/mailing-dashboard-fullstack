import bcrypt from "bcrypt";

async function Decrypt(userPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error in password comparison:", error);
    throw error;
  }
}

export default Decrypt;
