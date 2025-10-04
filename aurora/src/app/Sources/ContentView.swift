import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("Aurora — Preview")
                .font(.title)
                .padding(.top, 20)

            Text("Core status:")
                .font(.headline)

            Button(action: {
                // Example: call into C ABI wrapper (requires bridging in Xcode/SWIFTPM)
                aurora_hello_core()
            }) {
                Text("Initialize Aurora Core")
                    .padding()
                    .background(Color.accentColor)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }

            Spacer()
        }
        .padding()
    }
}