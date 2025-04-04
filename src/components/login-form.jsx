"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
// import { login } from "@/lib/reducers/auth";
import { useDispatch } from "react-redux";

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const handleLogin = async (e) => {
    const {email, password} = formdata;
    e.preventDefault()
    try {
      const response = await fetch(`https://backend-uat.alphacapitalgroup.uk/adm/email/signin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Data : ",data)
      if (response.ok) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("idtoken", data?.idToken);
        router.push("/dashboard");
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => {
                    console.log("Changing email : ", e)
                    console.log("Changing email : ", e.target.value)
                    setFormdata(prev => ({ ...prev, email: e.target.value }))
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required
                  onChange={(e) => {
                    console.log("Changing email : ", e)
                    console.log("Changing email : ", e.target.value)
                    setFormdata(prev => ({ ...prev, password: e.target.value }))
                  }}

                />
              </div>
              <Button onClick={handleLogin} type="submit" className="w-full" >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
