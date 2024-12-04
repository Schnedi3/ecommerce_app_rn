import * as Linking from "expo-linking";

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/", { scheme: "myapp" }),
    });

    if (createdSessionId) {
      setActive!({ session: createdSessionId });
    }
  } catch (error) {
    console.log(error);
  }
};
