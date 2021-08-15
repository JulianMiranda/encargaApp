import axios from 'axios';

const ApiStack = {
    sendOtp: async (phoneNumber: string)=>{
        console.log(phoneNumber);
        
        return new Promise((resolve, reject) =>{
            axios.post('https://otp.apistack.run/v1/sendOtp',{
                phoneNumber: phoneNumber,
                messageFormat: 'Tú código de Packuba es ${otp}',
            },{
                headers: {
                    'x-as-apikey': 'b0f61d9c-03cc-49d1-bdf3-4eda846bb79c',
                    'Content-Type': 'application/json'
                }
            })
            .then((resp: any) =>resp.data)
            .then((resp: any) =>{
                resolve(resp.data.requestId);
            })
            .catch((error: any) =>{console.log('Dio err', error);
             reject(error)})
          
        });
    },
    verifyOtp: async(requestId: string, otp: string)=>{
        return new Promise((resolve, reject) =>{
            axios.post('https://otp.apistack.run/v1/verifyOtp',{
                requestId: requestId,
                otp: otp
            },{ headers: {
                'x-as-apikey': 'b0f61d9c-03cc-49d1-bdf3-4eda846bb79c',
                'Content-Type': 'application/json'
            }}  )
            .then((resp: any) =>resp.data)
            .then((resp: any) =>{
                resolve(resp.data.isOtpValid);
            })
            .catch((error: any) =>{reject(error)})
        })
    }
};
export default ApiStack;