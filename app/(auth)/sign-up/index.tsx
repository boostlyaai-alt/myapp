import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";


type FormState = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canSubmit = useMemo(() => {
    const { name, username, email, password } = form;
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim())
      return false;
    if (!isValidEmail(email)) return false;
    if (password.trim().length < 6) return false;
    return true;
  }, [form]);

  const onChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      Alert.alert("Success", "Account created!");
      router.replace("/dashboard");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#070A12]"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* خلفية Blur/Glow خفيفة */}
      <View className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <View className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-5 py-6">
          <View
            className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl"
          >
            {/* Header */}
            <View>
              <Text className="text-2xl font-extrabold text-white">
                Create account
              </Text>
              <Text className="mt-1 text-white/65">
                Sign up in a few seconds
              </Text>
            </View>

            {/* Divider */}
            <View className="my-4 h-px bg-white/10" />

            {/* Staggered fields */}
            <View>
              <AnimatedField
                i={0}
                label="Name"
                placeholder="John Doe"
                value={form.name}
                onChangeText={(v) => onChange("name", v)}
              />
              <AnimatedField
                i={1}
                label="Username"
                placeholder="johnny"
                value={form.username}
                onChangeText={(v) => onChange("username", v)}
                autoCapitalize="none"
              />
              <AnimatedField
                i={2}
                label="Email"
                placeholder="john@example.com"
                value={form.email}
                onChangeText={(v) => onChange("email", v)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AnimatedField
                i={3}
                label="Password"
                placeholder="••••••••"
                value={form.password}
                onChangeText={(v) => onChange("password", v)}
                secureTextEntry
              />
            </View>

            {/* CTA */}
            <View className="mt-5">
              <Pressable
                onPress={handleSubmit}
                disabled={!canSubmit || loading}
              >
                {({ pressed }) => (
                  <View
                    className="overflow-hidden rounded-2xl"
                  >
                    {/* زر بجراديانت وهمي (Layer) */}
                    <View className="absolute inset-0 bg-white" />
                    <View className="absolute inset-0 bg-indigo-500/15" />

                    <View className="flex-row items-center justify-center py-4">
                      {loading ? (
                        <View
                          className="mr-2 h-4 w-4 rounded-full border-2 border-slate-900/30 border-t-slate-900"
                          style={{ transform: [{ rotate: "45deg" }] }}
                        />
                      ) : null}

                      <Text className="text-base font-extrabold text-slate-950">
                        {loading ? "Creating..." : "Sign up"}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>

              <Pressable onPress={() => router.back()} className="mt-3">
                {({ pressed }) => (
                  <View
                    className="items-center py-2"
                  >
                    <Text className="text-white/75 underline">
                      Already have an account? Go back
                    </Text>
                  </View>
                )}
              </Pressable>

              <Text className="mt-1 text-center text-xs text-white/40">
                Password must be at least 6 characters.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function AnimatedField(props: {
  i: number;
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  const {
    i,
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
  } = props;

  const [focused, setFocused] = useState(false);

  return (
    <View
      className="mt-3"
    >
      <Text className="mb-2 text-[13px] font-semibold text-white/80">
        {label}
      </Text>

      <View
        className="rounded-2xl border px-4 py-3"
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          className="text-[15px] text-white"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? "sentences"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>

      {/* Glow صغيرة تحت الحقل أثناء الفوكس */}
      {focused ? (
        <View
          className="mt-2 h-1 rounded-full bg-indigo-400/40"
        />
      ) : null}
    </View>
  );
}