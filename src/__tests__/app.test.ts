import supertest from 'supertest';
import app from "../app";


let token: string;
let userId: string;
let walletId:string
// let ids: string;
let pageNo = 1

let registerData = {
    firstName: "naheem",
    lastName: "adedokun",
    DOB: "2009-07-10 14:00:00.000",
    email: "naheem@gmail.com",
    password: "123456",
    phoneNumber: "07065074554"
}
let loginData = {
  email: "naheem@gmail.com",
  password: "123456",
}

describe("POST/register",()=>{
    it("return status code 201", async()=>{
        const res = await supertest(app)
        .post("/api/v1/auth/register")
        .send(registerData)
        walletId = res.body.accountDetails.walletId
        console.log(walletId)
        expect(res.statusCode).toEqual(201)
    })

    test("login", async () => {
      const response = await supertest(app)
        .post("/api/v1/auth/login")
        .send(loginData);
      token = response.body.accessToken;
    
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // expect(response.body.message).toBe("You are logged in");
  });


    test("All accounts and balances", async () => {
      const response = await supertest(app)
      .get("/api/v1/balance/1")
      .set("token", `Bearer ${token}`);
      console.log(token,'first');
      expect(response.statusCode).toBe(200);
  });

})

describe("balances", () => {
  console.log(token,'referrer');
  
});
