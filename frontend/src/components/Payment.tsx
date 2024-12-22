import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useUser } from "@clerk/clerk-expo";

import { usePayment } from "@/src/api/payment";
import { useAddOrder } from "@/src/api/order";
import Modal from "@/src/components/SuccessModal";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export default function Payment({
  totalCart,
}: {
  totalCart: number;
}): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState<boolean>(false);

  const { color } = useThemeColor();

  const { mutate: paymentSheet } = usePayment();
  const { user } = useUser();
  const { mutate: addOrder } = useAddOrder();

  const initializePaymentSheet = async (): Promise<void> => {
    paymentSheet(totalCart, {
      onSuccess: async ({ data }: any) => {
        const { paymentIntent, ephemeralKey, customer } = data;
        const { error } = await initPaymentSheet({
          merchantDisplayName: "Example, Inc.",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          defaultBillingDetails: { name: user?.firstName ?? "" },
        });
        if (!error) {
          setLoading(true);
        }
      },
    });
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`${error.code}`, error.message);
    } else {
      setIsModalOpen(true);
      addOrder(totalCart);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.payment,
          { backgroundColor: pressed ? color.accent : color.invertedBg },
        ]}
        onPress={openPaymentSheet}
        disabled={!loading}
      >
        <Text style={[styles.paymentText, { color: color.invertedText }]}>
          Checkout
        </Text>
      </Pressable>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </View>
  );
}

const styles = StyleSheet.create({
  payment: {
    marginHorizontal: "5%",
    marginTop: 25,
    padding: 16,
    borderRadius: 4,
  },
  paymentText: {
    fontFamily: "QuickSandMedium",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
