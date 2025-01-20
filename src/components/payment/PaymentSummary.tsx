@@ .. @@
 interface PaymentSummaryProps {
   packageDetails: Package;
+  cashbackPercentage?: number;
 }

-export default function PaymentSummary({ packageDetails }: PaymentSummaryProps) {
+export default function PaymentSummary({ packageDetails, cashbackPercentage = 0 }: PaymentSummaryProps) {
   const originalPrice = packageDetails.discount 
     ? packageDetails.price / (1 - packageDetails.discount / 100) 
     : packageDetails.price;
+    
+  const cashbackAmount = (packageDetails.price * cashbackPercentage) / 100;

   return (
     <div className="rounded-lg bg-gray-50 p-6">
@@ .. @@
           <span className="text-gray-500">Original Price</span>
           <span className="line-through">{formatPrice(originalPrice)}</span>
         </div>
+        
+        {cashbackPercentage > 0 && (
+          <div className="flex justify-between text-green-600">
+            <span>Cashback ({cashbackPercentage}%)</span>
+            <span>+{formatPrice(cashbackAmount)}</span>
+          </div>
+        )}

         <div className="pt-3 border-t">
           <div className="flex justify-between text-lg font-semibold">
             <span>Total</span>
             <span className="text-red-500">{formatPrice(packageDetails.price)}</span>
           </div>
+          {cashbackPercentage > 0 && (
+            <p className="text-sm text-green-600 mt-1">
+              You'll receive {formatPrice(cashbackAmount)} in your wallet
+            </p>
+          )}
         </div>
       </div>
     </div>
   );
